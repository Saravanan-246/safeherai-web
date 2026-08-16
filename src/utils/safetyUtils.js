/* =========================================================
   SafeHerAI — Safety Utilities
   Pure helpers for safety score presentation and state.
   ========================================================= */

/**
 * Clamp a safety score between 0 and 100.
 *
 * @param {number} score
 * @returns {number}
 */
export function clampSafetyScore(score) {
  const value = Number(score);

  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, Math.min(100, value));
}

/**
 * Convert a numeric score into a simple UI level.
 *
 * IMPORTANT:
 * This is presentation logic only.
 * It is not the application's actual risk model.
 *
 * @param {number} score
 * @returns {"low"|"medium"|"high"}
 */
export function getRiskLevel(score) {
  const value = clampSafetyScore(score);

  if (value >= 80) {
    return "low";
  }

  if (value >= 60) {
    return "medium";
  }

  return "high";
}

/**
 * Get a readable safety label.
 *
 * @param {number} score
 * @returns {string}
 */
export function getSafetyLabel(score) {
  const value = clampSafetyScore(score);

  if (value >= 80) {
    return "High";
  }

  if (value >= 60) {
    return "Moderate";
  }

  return "Low";
}

/**
 * Get a status used by SafetyStatus.jsx.
 *
 * @param {number} score
 * @returns {"safe"|"caution"|"alert"}
 */
export function getSafetyStatus(score) {
  const riskLevel = getRiskLevel(score);

  if (riskLevel === "low") {
    return "safe";
  }

  if (riskLevel === "medium") {
    return "caution";
  }

  return "alert";
}

/**
 * Check whether a safety score is usable.
 *
 * @param {unknown} score
 * @returns {boolean}
 */
export function isValidSafetyScore(score) {
  const value = Number(score);

  return Number.isFinite(value) && value >= 0 && value <= 100;
}

/**
 * Sort routes by safety score.
 *
 * Presentation/helper utility only.
 *
 * @param {Array} routes
 * @returns {Array}
 */
export function sortRoutesBySafety(routes = []) {
  if (!Array.isArray(routes)) {
    return [];
  }

  return [...routes].sort(
    (a, b) =>
      clampSafetyScore(b?.safetyScore) -
      clampSafetyScore(a?.safetyScore),
  );
}

/**
 * Return the safest route from a route list.
 *
 * @param {Array} routes
 * @returns {object|null}
 */
export function getSafestRoute(routes = []) {
  const sortedRoutes = sortRoutesBySafety(routes);

  return sortedRoutes[0] ?? null;
}