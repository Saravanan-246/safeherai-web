/* =========================================================
   SafeHerAI — Location Service
   Handles browser/device geolocation access.
   ========================================================= */

const DEFAULT_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 5000,
};

export function isLocationSupported() {
  return typeof navigator !== "undefined" &&
    "geolocation" in navigator;
}

export function getCurrentLocation(options = {}) {
  return new Promise((resolve, reject) => {
    if (!isLocationSupported()) {
      reject(
        new Error(
          "Geolocation is not supported by this browser.",
        ),
      );

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } =
          position.coords;

        resolve({
          latitude,
          longitude,
          accuracy,
          timestamp: position.timestamp,
        });
      },
      (error) => {
        let message = "Unable to determine your location.";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            message =
              "Location permission was denied.";
            break;

          case error.POSITION_UNAVAILABLE:
            message =
              "Your location is currently unavailable.";
            break;

          case error.TIMEOUT:
            message =
              "Location request timed out.";
            break;

          default:
            break;
        }

        reject(new Error(message));
      },
      {
        ...DEFAULT_OPTIONS,
        ...options,
      },
    );
  });
}

export function watchLocation(
  onSuccess,
  onError,
  options = {},
) {
  if (!isLocationSupported()) {
    onError?.(
      new Error(
        "Geolocation is not supported by this browser.",
      ),
    );

    return null;
  }

  const watchId = navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude, accuracy } =
        position.coords;

      onSuccess?.({
        latitude,
        longitude,
        accuracy,
        timestamp: position.timestamp,
      });
    },
    (error) => {
      let message = "Unable to track your location.";

      if (error.code === error.PERMISSION_DENIED) {
        message = "Location permission was denied.";
      }

      if (error.code === error.POSITION_UNAVAILABLE) {
        message = "Your location is unavailable.";
      }

      if (error.code === error.TIMEOUT) {
        message = "Location tracking timed out.";
      }

      onError?.(new Error(message));
    },
    {
      ...DEFAULT_OPTIONS,
      ...options,
    },
  );

  return watchId;
}

export function clearLocationWatch(watchId) {
  if (
    watchId === null ||
    watchId === undefined ||
    !isLocationSupported()
  ) {
    return;
  }

  navigator.geolocation.clearWatch(watchId);
}