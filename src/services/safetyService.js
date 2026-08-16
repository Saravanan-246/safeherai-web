/* =========================================================
   SafeHerAI — Safety Service
   Safety data abstraction.

   Current stage:
   - Mock/demo data

   Future:
   - OpenStreetMap / Overpass
   - trusted community data
   - backend safety intelligence
   ========================================================= */

import {
  mockSafetyData,
} from "../data/mockSafetyData";

function cloneSafetyData() {
  return {
    overview: {
      ...mockSafetyData.overview,
    },

    signals: mockSafetyData.signals.map(
      (signal) => ({
        ...signal,
      }),
    ),

    markers: mockSafetyData.markers.map(
      (marker) => ({
        ...marker,
      }),
    ),

    breakdown: mockSafetyData.breakdown.map(
      (item) => ({
        ...item,
      }),
    ),
  };
}

export async function getSafetySignals({
  coordinates = null,
  route = null,
} = {}) {
  /*
   * Coordinates and route are accepted now so the
   * service contract is ready for real data later.
   */

  await Promise.resolve();

  return cloneSafetyData();
}

export async function getSafetyOverview({
  coordinates = null,
  route = null,
} = {}) {
  await Promise.resolve();

  const data = cloneSafetyData();

  return data.overview;
}

export async function getNearbySafetySignals({
  coordinates = null,
} = {}) {
  await Promise.resolve();

  const data = cloneSafetyData();

  return data.signals;
}