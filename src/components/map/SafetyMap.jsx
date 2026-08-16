import { Activity, MapPin, ShieldCheck } from "lucide-react";

import RealMap from "./RealMap";
import MapLegend from "./MapLegend";

const DEFAULT_CENTER = [11.0168, 76.9558];

function isValidLatLng(point) {
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

function normalizeRoute(route) {
  if (!Array.isArray(route)) {
    return [];
  }

  return route
    .filter(isValidLatLng)
    .map(([latitude, longitude]) => [
      Number(latitude),
      Number(longitude),
    ]);
}

function normalizeMarkers(markers) {
  if (!Array.isArray(markers)) {
    return [];
  }

  return markers
    .filter(
      (marker) =>
        marker &&
        Array.isArray(marker.position) &&
        isValidLatLng(marker.position),
    )
    .map((marker) => ({
      ...marker,
      position: [
        Number(marker.position[0]),
        Number(marker.position[1]),
      ],
    }));
}

function SafetyMap({
  center = DEFAULT_CENTER,
  zoom = 14,

  userLocation = null,
  destination = null,

  route = [],
  signals = [],

  showLegend = true,
  showLocationLabel = false,
  showUserAccuracy = true,
  autoFitRoute = false,

  onMapClick,
  onMarkerClick,
}) {
  const normalizedRoute = normalizeRoute(route);

  const normalizedMarkers = normalizeMarkers(
    signals,
  ).map((marker) => ({
    ...marker,
    onClick: onMarkerClick,
  }));

  return (
    <section
      aria-label="SafeHerAI safety map"
      className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"
    >
      {/* Real map */}

      <RealMap
        center={center}
        zoom={zoom}
        userLocation={userLocation}
        destination={destination}
        route={normalizedRoute}
        safetyMarkers={normalizedMarkers}
        showUserAccuracy={showUserAccuracy}
        autoFitRoute={autoFitRoute}
        onMapClick={onMapClick}
        className="min-h-[420px] sm:min-h-[500px]"
      />

      {/* =====================================================
          SAFETY MAP HEADER
          ===================================================== */}

      <div className="pointer-events-none absolute left-4 top-16 z-[500] sm:left-5">
        <div className="rounded-xl border border-white/80 bg-white/90 px-3.5 py-3 shadow-lg shadow-slate-900/10 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <ShieldCheck className="h-4 w-4" />
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Safety view
              </p>

              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                <p className="text-[10px] font-semibold text-slate-800">
                  Live map active
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          TOP RIGHT STATUS
          ===================================================== */}

      <div className="pointer-events-none absolute right-4 top-16 z-[500] hidden sm:block">
        <div className="flex items-center gap-2 rounded-xl border border-white/80 bg-white/90 px-3 py-2.5 shadow-lg shadow-slate-900/10 backdrop-blur-md">
          <Activity className="h-3.5 w-3.5 text-blue-600" />

          <div>
            <p className="text-[9px] font-medium text-slate-400">
              Journey monitoring
            </p>

            <p className="mt-0.5 text-[10px] font-semibold text-slate-700">
              Safety intelligence active
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          CURRENT LOCATION LABEL
          ===================================================== */}

      {showLocationLabel &&
        Array.isArray(userLocation) &&
        userLocation.length >= 2 && (
          <div className="pointer-events-none absolute bottom-20 left-4 z-[500] sm:left-5">
            <div className="flex items-center gap-2 rounded-xl border border-white/80 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md">
              <MapPin className="h-3.5 w-3.5 text-blue-600" />

              <div>
                <p className="text-[9px] font-medium text-slate-400">
                  Current location
                </p>

                <p className="mt-0.5 font-mono text-[10px] font-medium text-slate-700">
                  GPS active
                </p>
              </div>
            </div>
          </div>
        )}

      {/* =====================================================
          LEGEND
          ===================================================== */}

      {showLegend && (
        <div className="absolute bottom-4 left-4 z-[500] max-w-[calc(100%-2rem)] sm:left-5">
          <MapLegend />
        </div>
      )}
    </section>
  );
}

export default SafetyMap;