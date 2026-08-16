import { useEffect, useMemo } from "react";
import {
  Circle,
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

/* =========================================================
   SafeHerAI — RealMap
   Real Leaflet + OpenStreetMap renderer

   Responsibilities:
   - Render real map tiles
   - Render user location
   - Render destination
   - Render route geometry
   - Render safety markers
   - Handle map interactions

   Does NOT:
   - Fetch GPS
   - Geocode
   - Calculate routes
   - Calculate safety scores
   ========================================================= */

const DEFAULT_CENTER = [11.0168, 76.9558];
const DEFAULT_ZOOM = 14;

/* ---------------------------------------------------------
   Marker factory
   --------------------------------------------------------- */

function createDotIcon({
  background,
  size = 16,
}) {
  return L.divIcon({
    className: "safeherai-map-marker",
    html: `
      <div
        style="
          width:${size}px;
          height:${size}px;
          border-radius:9999px;
          background:${background};
          border:3px solid #ffffff;
          box-shadow:0 3px 12px rgba(15,23,42,0.18);
        "
      ></div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

const USER_ICON = createDotIcon({
  background: "#2563eb",
  size: 18,
});

const DESTINATION_ICON = createDotIcon({
  background: "#0f172a",
  size: 16,
});

const SAFETY_ICONS = {
  safe: createDotIcon({
    background: "#10b981",
    size: 14,
  }),

  caution: createDotIcon({
    background: "#f59e0b",
    size: 14,
  }),

  police: createDotIcon({
    background: "#2563eb",
    size: 14,
  }),

  medical: createDotIcon({
    background: "#7c3aed",
    size: 14,
  }),

  emergency: createDotIcon({
    background: "#dc2626",
    size: 14,
  }),
};

/* ---------------------------------------------------------
   Helpers
   --------------------------------------------------------- */

function isValidPoint(point) {
  return (
    Array.isArray(point) &&
    point.length >= 2 &&
    Number.isFinite(Number(point[0])) &&
    Number.isFinite(Number(point[1])) &&
    Number(point[0]) >= -90 &&
    Number(point[0]) <= 90 &&
    Number(point[1]) >= -180 &&
    Number(point[1]) <= 180
  );
}

function normalizePoint(point) {
  return [
    Number(point[0]),
    Number(point[1]),
  ];
}

/* ---------------------------------------------------------
   Map event bridge
   --------------------------------------------------------- */

function MapEventBridge({ onMapClick }) {
  useMapEvents({
    click(event) {
      onMapClick?.({
        latitude: event.latlng.lat,
        longitude: event.latlng.lng,
      });
    },
  });

  return null;
}

/* ---------------------------------------------------------
   Recenter map when location changes
   --------------------------------------------------------- */

function RecenterMap({
  center,
  zoom,
  enabled = true,
}) {
  const map = useMap();

  useEffect(() => {
    if (!enabled || !isValidPoint(center)) {
      return;
    }

    map.setView(normalizePoint(center), zoom, {
      animate: true,
    });
  }, [center, enabled, map, zoom]);

  return null;
}

/* ---------------------------------------------------------
   Fit route into viewport
   --------------------------------------------------------- */

function FitRoute({
  route,
  enabled = false,
}) {
  const map = useMap();

  useEffect(() => {
    if (!enabled || route.length < 2) {
      return;
    }

    const bounds = L.latLngBounds(route);

    map.fitBounds(bounds, {
      padding: [42, 42],
      maxZoom: 16,
      animate: true,
    });
  }, [enabled, map, route]);

  return null;
}

/* =========================================================
   Main component
   ========================================================= */

function RealMap({
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,

  userLocation = null,
  destination = null,

  route = [],
  safetyMarkers = [],

  showUserAccuracy = true,
  autoFitRoute = false,
  recenterOnLocation = true,

  onMapClick,
  onMarkerClick,
}) {
  const normalizedCenter = useMemo(() => {
    if (isValidPoint(userLocation)) {
      return normalizePoint(userLocation);
    }

    if (isValidPoint(center)) {
      return normalizePoint(center);
    }

    return DEFAULT_CENTER;
  }, [center, userLocation]);

  const normalizedRoute = useMemo(() => {
    if (!Array.isArray(route)) {
      return [];
    }

    return route
      .filter(isValidPoint)
      .map(normalizePoint);
  }, [route]);

  const normalizedDestination = useMemo(() => {
    if (!isValidPoint(destination)) {
      return null;
    }

    return normalizePoint(destination);
  }, [destination]);

  const normalizedMarkers = useMemo(() => {
    if (!Array.isArray(safetyMarkers)) {
      return [];
    }

    return safetyMarkers
      .filter(
        (marker) =>
          marker &&
          isValidPoint(marker.position),
      )
      .map((marker) => ({
        ...marker,
        position: normalizePoint(marker.position),
      }));
  }, [safetyMarkers]);

  return (
    <div className="relative h-full min-h-[420px] w-full overflow-hidden rounded-2xl">
      <MapContainer
        center={normalizedCenter}
        zoom={zoom}
        scrollWheelZoom
        zoomControl={false}
        className="h-full min-h-[420px] w-full"
        attributionControl
      >
        {/* OpenStreetMap */}

        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'
        />

        {/* Map interaction */}

        <MapEventBridge
          onMapClick={onMapClick}
        />

        {/* Location recenter */}

        <RecenterMap
          center={userLocation}
          zoom={zoom}
          enabled={
            recenterOnLocation &&
            isValidPoint(userLocation)
          }
        />

        {/* Route fitting */}

        <FitRoute
          route={normalizedRoute}
          enabled={autoFitRoute}
        />

        {/* ---------------------------------------------------
            Route
            --------------------------------------------------- */}

        {normalizedRoute.length >= 2 && (
          <>
            {/* Outer route stroke */}

            <Polyline
              positions={normalizedRoute}
              pathOptions={{
                color: "#ffffff",
                weight: 10,
                opacity: 0.96,
                lineCap: "round",
                lineJoin: "round",
              }}
            />

            {/* Main route */}

            <Polyline
              positions={normalizedRoute}
              pathOptions={{
                color: "#2563eb",
                weight: 5,
                opacity: 1,
                lineCap: "round",
                lineJoin: "round",
              }}
            />
          </>
        )}

        {/* ---------------------------------------------------
            Safety markers
            --------------------------------------------------- */}

        {normalizedMarkers.map((marker) => {
          const icon =
            SAFETY_ICONS[marker.type] ??
            SAFETY_ICONS.caution;

          return (
            <Marker
              key={marker.id}
              position={marker.position}
              icon={icon}
              eventHandlers={{
                click: () => {
                  onMarkerClick?.(marker);
                },
              }}
            />
          );
        })}

        {/* ---------------------------------------------------
            User location
            --------------------------------------------------- */}

        {isValidPoint(userLocation) && (
          <>
            {showUserAccuracy && (
              <Circle
                center={normalizePoint(
                  userLocation,
                )}
                radius={Math.max(
                  20,
                  Number(userLocation.accuracy) || 35,
                )}
                pathOptions={{
                  color: "#2563eb",
                  weight: 1,
                  opacity: 0.45,
                  fillColor: "#3b82f6",
                  fillOpacity: 0.08,
                }}
              />
            )}

            <Marker
              position={normalizePoint(
                userLocation,
              )}
              icon={USER_ICON}
            />
          </>
        )}

        {/* ---------------------------------------------------
            Destination
            --------------------------------------------------- */}

        {normalizedDestination && (
          <Marker
            position={normalizedDestination}
            icon={DESTINATION_ICON}
          />
        )}
      </MapContainer>

      {/* Small live status overlay */}

      <div className="pointer-events-none absolute left-4 top-4 z-[500]">
        <div className="rounded-xl border border-white/80 bg-white/95 px-3 py-2.5 shadow-lg shadow-slate-900/10 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Live map
              </p>

              <p className="mt-0.5 text-[10px] font-medium text-slate-700">
                OpenStreetMap
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RealMap;