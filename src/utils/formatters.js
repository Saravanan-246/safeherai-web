/* =========================================================
   SafeHerAI — Formatters
   Pure formatting helpers used across the application.
   ========================================================= */

/**
 * Format a distance in meters or kilometers.
 *
 * @param {number} meters
 * @returns {string}
 */
export function formatDistance(meters) {
  const value = Number(meters);

  if (!Number.isFinite(value) || value < 0) {
    return "—";
  }

  if (value < 1000) {
    return `${Math.round(value)} m`;
  }

  const kilometers = value / 1000;

  return `${kilometers.toFixed(kilometers >= 10 ? 0 : 1)} km`;
}

/**
 * Format a duration in seconds.
 *
 * @param {number} seconds
 * @returns {string}
 */
export function formatDuration(seconds) {
  const value = Number(seconds);

  if (!Number.isFinite(value) || value < 0) {
    return "—";
  }

  const totalMinutes = Math.round(value / 60);

  if (totalMinutes < 60) {
    return `${totalMinutes} min`;
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return minutes === 0
    ? `${hours} hr`
    : `${hours} hr ${minutes} min`;
}

/**
 * Format a numeric safety score.
 *
 * @param {number} score
 * @returns {string}
 */
export function formatScore(score) {
  const value = Number(score);

  if (!Number.isFinite(value)) {
    return "—";
  }

  return `${Math.round(Math.max(0, Math.min(100, value)))}/100`;
}

/**
 * Format a coordinate for technical UI.
 *
 * @param {number} value
 * @param {number} digits
 * @returns {string}
 */
export function formatCoordinate(value, digits = 5) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "—";
  }

  return number.toFixed(digits);
}

/**
 * Format a date/time into a readable local string.
 *
 * @param {string|number|Date} value
 * @returns {string}
 */
export function formatDateTime(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}