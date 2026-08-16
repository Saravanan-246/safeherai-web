import { useCallback, useEffect, useState } from "react";

import {
  getSafetySignals,
} from "../services/safetyService";

const INITIAL_STATE = {
  overview: null,
  signals: [],
  markers: [],
  breakdown: [],
  loading: false,
  error: null,
};

function useSafetySignals({
  coordinates = null,
  enabled = true,
} = {}) {
  const [state, setState] = useState(INITIAL_STATE);

  const loadSafetySignals = useCallback(async () => {
    if (!enabled) return;

    setState((current) => ({
      ...current,
      loading: true,
      error: null,
    }));

    try {
      const data = await getSafetySignals({
        coordinates,
      });

      setState({
        overview: data?.overview ?? null,
        signals: Array.isArray(data?.signals)
          ? data.signals
          : [],
        markers: Array.isArray(data?.markers)
          ? data.markers
          : [],
        breakdown: Array.isArray(data?.breakdown)
          ? data.breakdown
          : [],
        loading: false,
        error: null,
      });

      return data;
    } catch (error) {
      console.error(
        "Safety signal loading failed:",
        error,
      );

      setState((current) => ({
        ...current,
        loading: false,
        error:
          error?.message ??
          "Unable to load safety information.",
      }));

      return null;
    }
  }, [coordinates, enabled]);

  useEffect(() => {
    if (!enabled) return;

    loadSafetySignals();
  }, [enabled, loadSafetySignals]);

  return {
    overview: state.overview,
    signals: state.signals,
    markers: state.markers,
    breakdown: state.breakdown,

    loading: state.loading,
    error: state.error,

    hasSignals: state.signals.length > 0,

    refresh: loadSafetySignals,
  };
}

export default useSafetySignals;