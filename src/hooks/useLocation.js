import { useCallback, useEffect, useState } from "react";

const INITIAL_STATE = {
  coordinates: null,
  loading: false,
  error: null,
  permission: "unknown",
};

function useLocation({ watch = false, enabled = true } = {}) {
  const [state, setState] = useState(INITIAL_STATE);

  const handleSuccess = useCallback((position) => {
    const { latitude, longitude, accuracy } = position.coords;

    setState({
      coordinates: {
        latitude,
        longitude,
        accuracy,
      },
      loading: false,
      error: null,
      permission: "granted",
    });
  }, []);

  const handleError = useCallback((error) => {
    let message = "Unable to determine your location.";

    if (error.code === 1) {
      message =
        "Location permission was denied. Please allow location access.";
    }

    if (error.code === 2) {
      message = "Your location is currently unavailable.";
    }

    if (error.code === 3) {
      message = "Location request timed out.";
    }

    setState((current) => ({
      ...current,
      loading: false,
      error: message,
      permission: error.code === 1 ? "denied" : current.permission,
    }));
  }, []);

  const requestLocation = useCallback(() => {
    if (!enabled) return;

    if (!navigator.geolocation) {
      setState({
        coordinates: null,
        loading: false,
        error: "Location services are not supported by this browser.",
        permission: "unsupported",
      });

      return;
    }

    setState((current) => ({
      ...current,
      loading: true,
      error: null,
    }));

    if (watch) {
      navigator.geolocation.getCurrentPosition(
        handleSuccess,
        handleError,
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 5000,
        },
      );

      return;
    }

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
      },
    );
  }, [enabled, handleError, handleSuccess, watch]);

  useEffect(() => {
    if (!enabled) return;

    requestLocation();
  }, [enabled, requestLocation]);

  return {
    ...state,
    requestLocation,
    hasLocation: Boolean(state.coordinates),
  };
}

export default useLocation;