import { useCallback, useState } from "react";

import { geocodeFirstMatch } from "../services/geocodingService";
import {
  calculateSafeRoutes,
} from "../services/routingService";

/* =========================================================
   SafeHerAI — useSafeRoute
   Real destination → geocoding → OSRM route flow

   Responsibilities:
   - Manage route-search state
   - Resolve destination text into coordinates
   - Request real OSRM routes
   - Track selected route

   Does NOT:
   - Access browser GPS
   - Render UI
   - Calculate safety scores
   ========================================================= */

const INITIAL_STATE = {
  routes: [],
  selectedRoute: null,

  destination: "",
  destinationLocation: null,

  loading: false,
  error: null,
};

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

function useSafeRoute({
  origin = null,
  countryCodes = "in",
} = {}) {
  const [state, setState] =
    useState(INITIAL_STATE);

  /* =====================================================
     Search destination + calculate routes
     ===================================================== */

  const searchRoutes = useCallback(
    async (
      destinationQuery,
      options = {},
    ) => {
      const trimmedDestination =
        typeof destinationQuery === "string"
          ? destinationQuery.trim()
          : "";

      if (!trimmedDestination) {
        setState((current) => ({
          ...current,
          error: "Enter a destination to continue.",
        }));

        return [];
      }

      if (!isValidCoordinate(origin)) {
        setState((current) => ({
          ...current,
          destination: trimmedDestination,
          error:
            "Your current location is required before route calculation.",
        }));

        return [];
      }

      setState((current) => ({
        ...current,
        destination: trimmedDestination,
        destinationLocation: null,
        routes: [],
        selectedRoute: null,
        loading: true,
        error: null,
      }));

      try {
        /* -------------------------------------------------
           1. Geocode destination
           ------------------------------------------------- */

        const destinationLocation =
          await geocodeFirstMatch(
            trimmedDestination,
            {
              countryCodes,
              signal: options.signal,
            },
          );

        if (!destinationLocation) {
          throw new Error(
            "Destination could not be found.",
          );
        }

        /* -------------------------------------------------
           2. Calculate real OSRM routes
           ------------------------------------------------- */

        const routes =
          await calculateSafeRoutes(
            origin,
            {
              latitude:
                destinationLocation.latitude,

              longitude:
                destinationLocation.longitude,
            },
            {
              alternatives:
                options.alternatives ?? true,

              profile:
                options.profile ?? "driving",

              signal: options.signal,
            },
          );

        const validRoutes =
          Array.isArray(routes)
            ? routes.filter(
                (route) =>
                  route?.id &&
                  Array.isArray(route.points) &&
                  route.points.length >= 2,
              )
            : [];

        if (validRoutes.length === 0) {
          throw new Error(
            "No suitable routes were found.",
          );
        }

        /* -------------------------------------------------
           3. Store real route state
           ------------------------------------------------- */

        setState({
          routes: validRoutes,

          selectedRoute:
            validRoutes[0] ?? null,

          destination:
            trimmedDestination,

          destinationLocation: {
            id: destinationLocation.id,
            latitude:
              destinationLocation.latitude,
            longitude:
              destinationLocation.longitude,
            displayName:
              destinationLocation.displayName,
          },

          loading: false,
          error: null,
        });

        return validRoutes;
      } catch (error) {
        if (error?.name === "AbortError") {
          setState((current) => ({
            ...current,
            loading: false,
          }));

          return [];
        }

        console.error(
          "Safe route search failed:",
          error,
        );

        setState((current) => ({
          ...current,
          routes: [],
          selectedRoute: null,
          destinationLocation: null,
          loading: false,
          error:
            error?.message ??
            "Unable to calculate a route right now.",
        }));

        return [];
      }
    },
    [countryCodes, origin],
  );

  /* =====================================================
     Select route
     ===================================================== */

  const selectRoute = useCallback((route) => {
    if (!route?.id) {
      return;
    }

    setState((current) => ({
      ...current,
      selectedRoute: route,
    }));
  }, []);

  /* =====================================================
     Clear
     ===================================================== */

  const clearRoutes = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return {
    routes: state.routes,

    selectedRoute:
      state.selectedRoute,

    destination:
      state.destination,

    destinationLocation:
      state.destinationLocation,

    loading:
      state.loading,

    error:
      state.error,

    hasRoutes:
      state.routes.length > 0,

    hasDestination:
      Boolean(state.destinationLocation),

    searchRoutes,
    selectRoute,
    clearRoutes,
  };
}

export default useSafeRoute;