/* =========================================================
   SafeHerAI — Geocoding Service
   Converts destination text into geographic coordinates.

   Current provider:
   OpenStreetMap Nominatim

   Important:
   - Request geocoding only on explicit search.
   - Do not implement client-side autocomplete.
   - Keep provider logic isolated here.
   ========================================================= */

const NOMINATIM_URL =
  "https://nominatim.openstreetmap.org/search";

const DEFAULT_HEADERS = {
  Accept: "application/json",
};

function normalizeResult(result) {
  const latitude = Number(result?.lat);
  const longitude = Number(result?.lon);

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude)
  ) {
    return null;
  }

  return {
    id: result.place_id ?? `${latitude}:${longitude}`,
    latitude,
    longitude,
    displayName:
      result.display_name ?? "Unknown location",
    type: result.type ?? null,
    category: result.category ?? null,
  };
}

export async function geocodeDestination(
  query,
  {
    countryCodes = "in",
    limit = 1,
    signal,
  } = {},
) {
  const trimmedQuery =
    typeof query === "string"
      ? query.trim()
      : "";

  if (!trimmedQuery) {
    throw new Error(
      "A destination is required.",
    );
  }

  const params = new URLSearchParams({
    q: trimmedQuery,
    format: "jsonv2",
    limit: String(
      Math.max(1, Math.min(limit, 5)),
    ),
    addressdetails: "1",
  });

  if (countryCodes) {
    params.set("countrycodes", countryCodes);
  }

  const response = await fetch(
    `${NOMINATIM_URL}?${params.toString()}`,
    {
      method: "GET",
      headers: DEFAULT_HEADERS,
      signal,
    },
  );

  if (!response.ok) {
    throw new Error(
      `Geocoding request failed (${response.status}).`,
    );
  }

  const results = await response.json();

  if (!Array.isArray(results) || results.length === 0) {
    return [];
  }

  return results
    .map(normalizeResult)
    .filter(Boolean);
}

export async function geocodeFirstMatch(
  query,
  options = {},
) {
  const results = await geocodeDestination(
    query,
    {
      ...options,
      limit: 1,
    },
  );

  return results[0] ?? null;
}