/* =========================================================
   SafeHerAI — Routing Service
   Real OSRM routing integration

   Responsibilities:
   - Validate coordinates
   - Request real routes from OSRM
   - Request alternative routes
   - Normalize OSRM responses
   - Convert GeoJSON coordinates into Leaflet coordinates

   Does NOT:
   - Calculate safety scores
   - Access browser GPS
   - Geocode destination text
   - Render UI
   ========================================================= */

import {
  formatDistance,
  formatDuration,
} from "../utils/formatters";

const OSRM_BASE_URL =
  "https://router.project-osrm.org";

const DEFAULT_PROFILE = "driving";

const DEFAULT_OPTIONS = {
  alternatives: true,
  steps: false,
  geometries: "geojson",
  overview: "full",
};

/* =========================================================
   Coordinate helpers
   ========================================================= */

/**
 * Validate a latitude/longitude object.
 *
 * Expected:
 * {
 *   latitude: number,
 *   longitude: number
 * }
 */
function isValidCoordinate(point) {
  if (!point) {
    return false;
  }

  const latitude = Number(point.latitude);
  const longitude = Number(point.longitude);

  return (
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
}

/**
 * Convert our coordinate format into OSRM format.
 *
 * OSRM expects:
 * longitude,latitude
 */
function toOSRMCoordinate(point) {
  if (!isValidCoordinate(point)) {
    throw new Error(
      "Invalid route coordinate.",
    );
  }

  return `${Number(point.longitude)},${Number(
    point.latitude,
  )}`;
}

/**
 * Convert GeoJSON:
 *
 * [longitude, latitude]
 *
 * into Leaflet:
 *
 * [latitude, longitude]
 */
function normalizeGeometry(geometry) {
  const coordinates = geometry?.coordinates;

  if (
    geometry?.type !== "LineString" ||
    !Array.isArray(coordinates)
  ) {
    return [];
  }

  return coordinates
    .filter(
      (point) =>
        Array.isArray(point) &&
        point.length >= 2 &&
        Number.isFinite(Number(point[0])) &&
        Number.isFinite(Number(point[1])),
    )
    .map(([longitude, latitude]) => [
      Number(latitude),
      Number(longitude),
    ]);
}

/* =========================================================
   OSRM response normalization
   ========================================================= */

function normalizeRoute(route, index) {
  const distanceMeters = Number(route?.distance);
  const durationSeconds = Number(route?.duration);

  const points = normalizeGeometry(
    route?.geometry,
  );

  return {
    id: `osrm-route-${index + 1}`,

    name:
      index === 0
        ? "Recommended Route"
        : `Alternative Route ${index}`,

    description:
      index === 0
        ? "Primary route calculated by OSRM."
        : "Alternative route calculated by OSRM.",

    /* Raw values */

    distanceMeters: Number.isFinite(distanceMeters)
      ? distanceMeters
      : 0,

    durationSeconds: Number.isFinite(durationSeconds)
      ? durationSeconds
      : 0,

    /* UI-ready values */

    distance: formatDistance(distanceMeters),

    duration: formatDuration(durationSeconds),

    /* Real route geometry */

    points,

    /* Useful metadata */

    geometry: route?.geometry ?? null,

    legs: Array.isArray(route?.legs)
      ? route.legs
      : [],

    weight: Number.isFinite(Number(route?.weight))
      ? Number(route.weight)
      : null,

    /* Safety is NOT determined by OSRM */

    safetyScore: null,

    safetyLabel: "Pending analysis",
  };
}

/* =========================================================
   Request builder
   ========================================================= */

function buildRouteUrl(
  origin,
  destination,
  options = {},
) {
  const profile =
    options.profile ?? DEFAULT_PROFILE;

  const originCoordinate =
    toOSRMCoordinate(origin);

  const destinationCoordinate =
    toOSRMCoordinate(destination);

  const coordinates = [
    originCoordinate,
    destinationCoordinate,
  ].join(";");

  const params = new URLSearchParams({
    alternatives: String(
      options.alternatives ??
        DEFAULT_OPTIONS.alternatives,
    ),

    steps: String(
      options.steps ??
        DEFAULT_OPTIONS.steps,
    ),

    geometries:
      options.geometries ??
      DEFAULT_OPTIONS.geometries,

    overview:
      options.overview ??
      DEFAULT_OPTIONS.overview,
  });

  return [
    OSRM_BASE_URL,
    "route",
    "v1",
    profile,
    coordinates,
  ].join("/") + `?${params.toString()}`;
}

/* =========================================================
   Main route calculation
   ========================================================= */

/**
 * Calculate real routes between two coordinates.
 *
 * @param {{
 *   latitude:number,
 *   longitude:number
 * }} origin
 *
 * @param {{
 *   latitude:number,
 *   longitude:number
 * }} destination
 *
 * @param {object} options
 *
 * @returns {Promise<Array>}
 */
export async function calculateSafeRoutes(
  origin,
  destination,
  options = {},
) {
  if (!isValidCoordinate(origin)) {
    throw new Error(
      "A valid current location is required.",
    );
  }

  if (!isValidCoordinate(destination)) {
    throw new Error(
      "A valid destination location is required.",
    );
  }

  const {
    signal,
    ...requestOptions
  } = options;

  const url = buildRouteUrl(
    origin,
    destination,
    requestOptions,
  );

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(
      `Routing request failed (${response.status}).`,
    );
  }

  const data = await response.json();

  if (data?.code !== "Ok") {
    const message =
      data?.message ??
      "OSRM could not calculate a route.";

    switch (data?.code) {
      case "NoRoute":
        throw new Error(
          "No drivable route could be found between these locations.",
        );

      case "NoSegment":
        throw new Error(
          "One of the selected locations could not be matched to a road.",
        );

      case "InvalidQuery":
      case "InvalidValue":
      case "InvalidOptions":
        throw new Error(
          "The routing request was invalid.",
        );

      default:
        throw new Error(message);
    }
  }

  if (!Array.isArray(data.routes)) {
    throw new Error(
      "OSRM returned an invalid route response.",
    );
  }

  const routes = data.routes
    .map(normalizeRoute)
    .filter((route) => route.points.length >= 2);

  if (routes.length === 0) {
    throw new Error(
      "OSRM returned no usable route geometry.",
    );
  }

  return routes;
}

/* =========================================================
   Single best route
   ========================================================= */

export async function calculateRoute(
  origin,
  destination,
  options = {},
) {
  const routes = await calculateSafeRoutes(
    origin,
    destination,
    {
      ...options,
      alternatives: false,
    },
  );

  return routes[0] ?? null;
}

/* =========================================================
   Route utility
   ========================================================= */

/**
 * Return the shortest route from already-calculated routes.
 *
 * NOTE:
 * This is a distance comparison only.
 * It is NOT a safety decision.
 */
export function getShortestRoute(routes = []) {
  if (!Array.isArray(routes) || routes.length === 0) {
    return null;
  }

  return [...routes].sort(
    (a, b) =>
      Number(a.distanceMeters ?? Infinity) -
      Number(b.distanceMeters ?? Infinity),
  )[0] ?? null;
}

/**
 * Return the fastest route from already-calculated routes.
 *
 * NOTE:
 * This is an ETA comparison only.
 * It is NOT a safety decision.
 */
export function getFastestRoute(routes = []) {
  if (!Array.isArray(routes) || routes.length === 0) {
    return null;
  }

  return [...routes].sort(
    (a, b) =>
      Number(a.durationSeconds ?? Infinity) -
      Number(b.durationSeconds ?? Infinity),
  )[0] ?? null;
}