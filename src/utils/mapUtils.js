/* =========================================================
   SafeHerAI — Map Utilities
   Pure helpers for map coordinates and geometry.
   ========================================================= */

/**
 * Check whether a coordinate is valid.
 *
 * @param {{ latitude:number, longitude:number }} coordinate
 * @returns {boolean}
 */
export function isValidCoordinate(coordinate) {
  if (!coordinate) {
    return false;
  }

  const latitude = Number(coordinate.latitude);
  const longitude = Number(coordinate.longitude);

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
 * Normalize a coordinate object.
 *
 * @param {{ latitude:number, longitude:number, accuracy?:number }} coordinate
 * @returns {{ latitude:number, longitude:number, accuracy?:number }|null}
 */
export function normalizeCoordinate(coordinate) {
  if (!isValidCoordinate(coordinate)) {
    return null;
  }

  return {
    latitude: Number(coordinate.latitude),
    longitude: Number(coordinate.longitude),
    ...(Number.isFinite(Number(coordinate.accuracy))
      ? { accuracy: Number(coordinate.accuracy) }
      : {}),
  };
}

/**
 * Calculate the center of multiple coordinates.
 *
 * @param {Array<{latitude:number,longitude:number}>} coordinates
 * @returns {{latitude:number,longitude:number}|null}
 */
export function getCoordinateCenter(coordinates = []) {
  const validCoordinates = coordinates.filter(
    isValidCoordinate,
  );

  if (validCoordinates.length === 0) {
    return null;
  }

  const totals = validCoordinates.reduce(
    (result, coordinate) => ({
      latitude: result.latitude + Number(coordinate.latitude),
      longitude:
        result.longitude + Number(coordinate.longitude),
    }),
    {
      latitude: 0,
      longitude: 0,
    },
  );

  return {
    latitude:
      totals.latitude / validCoordinates.length,
    longitude:
      totals.longitude / validCoordinates.length,
  };
}

/**
 * Calculate approximate distance between two coordinates
 * using the Haversine formula.
 *
 * @param {{latitude:number,longitude:number}} from
 * @param {{latitude:number,longitude:number}} to
 * @returns {number} Distance in meters
 */
export function getDistanceBetweenCoordinates(
  from,
  to,
) {
  if (
    !isValidCoordinate(from) ||
    !isValidCoordinate(to)
  ) {
    return 0;
  }

  const earthRadius = 6371000;

  const lat1 = toRadians(from.latitude);
  const lat2 = toRadians(to.latitude);

  const deltaLat = toRadians(
    to.latitude - from.latitude,
  );

  const deltaLon = toRadians(
    to.longitude - from.longitude,
  );

  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLon / 2) ** 2;

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a),
    );

  return earthRadius * c;
}

/**
 * Convert degrees to radians.
 *
 * @param {number} degrees
 * @returns {number}
 */
export function toRadians(degrees) {
  return (Number(degrees) * Math.PI) / 180;
}