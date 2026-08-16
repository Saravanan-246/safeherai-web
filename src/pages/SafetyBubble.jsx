import { useMemo } from "react";
import {
  Activity,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import PageContainer from "../components/layout/PageContainer";
import SafetyMap from "../components/map/SafetyMap";
import RiskIndicator from "../components/safety/RiskIndicator";
import SafetyScore from "../components/safety/SafetyScore";
import SafetySignalList from "../components/safety/SafetySignalList";
import SafetyStatus from "../components/safety/SafetyStatus";
import StatusPill from "../components/ui/StatusPill";

import useLocation from "../hooks/useLocation";

import { mockSafetyData } from "../data/mockSafetyData";

const DEFAULT_CENTER = [11.0168, 76.9558];

function SafetyBubble({
  safetyData = mockSafetyData,
}) {
  /* =====================================================
     REAL DEVICE LOCATION
     ===================================================== */

  const {
    coordinates,
    loading: locationLoading,
    error: locationError,
    hasLocation,
    requestLocation,
  } = useLocation({
    enabled: true,
    watch: false,
  });

  const userLocation = useMemo(() => {
    if (!coordinates) {
      return null;
    }

    return [
      coordinates.latitude,
      coordinates.longitude,
    ];
  }, [coordinates]);

  /* =====================================================
     SAFETY DATA
     ===================================================== */

  const overview = safetyData?.overview ?? {};

  const score = Number(overview.score) || 0;

  const riskLevel =
    overview.riskLevel ?? "low";

  const status =
    overview.status ?? "safe";

  const signals = Array.isArray(
    safetyData?.signals,
  )
    ? safetyData.signals
    : [];

  const signalCount =
    overview.signalCount ?? signals.length;

  const statusLabel = useMemo(() => {
    const labels = {
      safe: "Protected",
      caution: "Use caution",
      alert: "Safety alert",
      loading: "Analyzing",
      unavailable: "Unavailable",
    };

    return labels[status] ?? "Safety status";
  }, [status]);

  return (
    <PageContainer size="wide">
      {/* ===================================================
          HEADER
          =================================================== */}

      <header className="mb-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <ShieldCheck className="h-3.5 w-3.5" />
              </div>

              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-blue-600">
                Safety Bubble
              </p>
            </div>

            <h1 className="mt-2 text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
              Your journey is protected
            </h1>

            <p className="mt-1.5 max-w-xl text-xs leading-5 text-slate-500">
              Stay aware of your current safety conditions,
              nearby signals, and journey status in one place.
            </p>
          </div>

          <StatusPill
            status={
              status === "safe"
                ? "success"
                : "active"
            }
          >
            {statusLabel}
          </StatusPill>
        </div>
      </header>

      {/* ===================================================
          GPS STATUS
          =================================================== */}

      {locationLoading && (
        <section className="mb-5 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <MapPin className="h-4 w-4 animate-pulse" />
            </div>

            <div>
              <p className="text-xs font-semibold text-blue-900">
                Getting your location
              </p>

              <p className="mt-1 text-[10px] leading-5 text-blue-700/70">
                SafeHerAI is requesting your current device
                location.
              </p>
            </div>
          </div>
        </section>
      )}

      {locationError && (
        <section className="mb-5 rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <MapPin className="h-4 w-4" />
              </div>

              <div>
                <p className="text-xs font-semibold text-amber-900">
                  Location unavailable
                </p>

                <p className="mt-1 text-[10px] leading-5 text-amber-800/70">
                  {locationError}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={requestLocation}
              className="rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-xs font-semibold text-amber-700 transition hover:bg-amber-50 active:scale-[0.98]"
            >
              Try again
            </button>
          </div>
        </section>
      )}

      {hasLocation && coordinates && (
        <section className="mb-5 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <MapPin className="h-4 w-4" />
              </div>

              <div>
                <p className="text-xs font-semibold text-emerald-900">
                  Current location detected
                </p>

                <p className="mt-1 font-mono text-[10px] text-emerald-700/80">
                  {coordinates.latitude.toFixed(6)},{" "}
                  {coordinates.longitude.toFixed(6)}
                </p>
              </div>
            </div>

            {Number.isFinite(
              coordinates.accuracy,
            ) && (
              <span className="font-mono text-[9px] text-emerald-700/70">
                ±{Math.round(coordinates.accuracy)} m
              </span>
            )}
          </div>
        </section>
      )}

      {/* ===================================================
          SAFETY STATUS
          =================================================== */}

      <section className="mb-5">
        <SafetyStatus status={status} />
      </section>

      {/* ===================================================
          MAIN WORKSPACE
          =================================================== */}

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        {/* =================================================
            REAL MAP
            ================================================= */}

        <section className="min-w-0">
          <div className="mb-3 flex items-end justify-between">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                Journey coverage
              </p>

              <h2 className="mt-1 text-sm font-semibold text-slate-900">
                Safety Bubble
              </h2>
            </div>

            <div className="hidden items-center gap-1.5 text-[9px] text-slate-400 sm:flex">
              <Activity className="h-3 w-3" />
              Live monitoring
            </div>
          </div>

          <SafetyMap
            center={
              userLocation ??
              DEFAULT_CENTER
            }
            zoom={15}
            userLocation={userLocation}
            destination={null}
            route={[]}
            signals={[]}
            showLegend
            showLocationLabel={hasLocation}
            showUserAccuracy
            autoFitRoute={false}
          />
        </section>

        {/* =================================================
            SAFETY INTELLIGENCE
            ================================================= */}

        <aside className="space-y-4">
          {/* Score */}

          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-blue-600">
                  Current assessment
                </p>

                <h2 className="mt-1.5 text-sm font-semibold tracking-tight text-slate-900">
                  Journey safety
                </h2>
              </div>

              <MapPin className="h-4 w-4 text-slate-300" />
            </div>

            <div className="mt-6 flex items-center gap-6">
              <SafetyScore
                score={score}
                size="large"
              />

              <div className="min-w-0 flex-1">
                <RiskIndicator level={riskLevel} />

                <div className="mt-4 border-t border-slate-100 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">
                      Active signals
                    </span>

                    <span className="font-mono text-xs font-medium text-slate-900">
                      {signalCount}
                    </span>
                  </div>

                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all duration-500"
                      style={{
                        width: `${Math.max(
                          0,
                          Math.min(100, score),
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Signals */}

          <SafetySignalList
            signals={signals}
            title="Live safety signals"
            emptyTitle="No active signals"
            emptyDescription="No relevant safety signals are currently available."
          />
        </aside>
      </div>

      {/* ===================================================
          JOURNEY SUMMARY
          =================================================== */}

      <section className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Bubble status
          </p>

          <div className="mt-2 flex items-center gap-2">
            <span
              className={[
                "h-1.5 w-1.5 rounded-full",
                hasLocation
                  ? "bg-emerald-500"
                  : "bg-amber-500",
              ].join(" ")}
            />

            <span className="text-xs font-semibold text-slate-800">
              {hasLocation
                ? "Location active"
                : "Waiting for location"}
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Safety score
          </p>

          <p className="mt-2 font-mono text-sm font-medium text-slate-900">
            {Math.round(score)} / 100
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Signals monitored
          </p>

          <p className="mt-2 font-mono text-sm font-medium text-slate-900">
            {signalCount}
          </p>
        </div>
      </section>
    </PageContainer>
  );
}

export default SafetyBubble;