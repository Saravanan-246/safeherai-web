import {
  Clock3,
  Map,
  Navigation,
  ShieldCheck,
} from "lucide-react";

function RouteDetails({
  route,
  onStartJourney,
}) {
  if (!route) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
            <Map className="h-4 w-4" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Route details
            </h3>

            <p className="mt-0.5 text-[11px] text-slate-400">
              Select a route to view its details.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const {
    name = "Selected route",
    distance = "—",
    duration = "—",
    safetyScore,
    safetyLabel = "Unavailable",
    description,
  } = route;

  const score =
    typeof safetyScore === "number"
      ? Math.max(0, Math.min(100, safetyScore))
      : null;

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {/* Header */}

      <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-blue-600">
            Selected route
          </p>

          <h2 className="mt-1.5 text-base font-semibold tracking-tight text-slate-950">
            {name}
          </h2>

          {description && (
            <p className="mt-1.5 max-w-lg text-xs leading-5 text-slate-500">
              {description}
            </p>
          )}
        </div>

        {score !== null && (
          <div className="shrink-0 rounded-xl bg-emerald-50 px-3 py-2 text-right">
            <p className="font-mono text-base font-medium text-emerald-700">
              {score}
            </p>

            <p className="text-[9px] font-medium text-emerald-600">
              safety score
            </p>
          </div>
        )}
      </div>

      {/* Metrics */}

      <div className="grid grid-cols-2 divide-x border-b border-slate-100">
        <div className="p-4">
          <div className="flex items-center gap-2 text-slate-400">
            <Navigation className="h-3.5 w-3.5" />

            <span className="text-[9px] font-medium uppercase tracking-wide">
              Distance
            </span>
          </div>

          <p className="mt-2 font-mono text-sm font-medium text-slate-900">
            {distance}
          </p>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 text-slate-400">
            <Clock3 className="h-3.5 w-3.5" />

            <span className="text-[9px] font-medium uppercase tracking-wide">
              Estimated time
            </span>
          </div>

          <p className="mt-2 font-mono text-sm font-medium text-slate-900">
            {duration}
          </p>
        </div>
      </div>

      {/* Safety analysis */}

      <div className="p-5">
        <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs font-semibold text-slate-900">
                Safety assessment
              </p>

              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">
                {safetyLabel}
              </span>
            </div>

            <p className="mt-1 text-[10px] leading-5 text-slate-500">
              This route has been evaluated using the available journey
              safety signals.
            </p>
          </div>
        </div>

        {/* Start */}

        <button
          type="button"
          onClick={() => onStartJourney?.(route)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-xs font-semibold text-white shadow-sm shadow-blue-600/15 transition hover:bg-blue-700 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          <Navigation className="h-3.5 w-3.5" />
          Start Safe Journey
        </button>
      </div>
    </section>
  );
}

export default RouteDetails;