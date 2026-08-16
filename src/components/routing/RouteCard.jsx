import {
  ArrowRight,
  Clock3,
  MapPin,
  ShieldCheck,
} from "lucide-react";

function RouteCard({
  route,
  selected = false,
  recommended = false,
  onSelect,
}) {
  if (!route) return null;

  const {
    name = "Route",
    distance = "—",
    duration = "—",
    safetyScore,
    safetyLabel = "Safety unavailable",
    description,
  } = route;

  const score =
    typeof safetyScore === "number" ? Math.max(0, Math.min(100, safetyScore)) : null;

  return (
    <article
      className={[
        "group relative rounded-2xl border bg-white p-4 transition-all duration-200",
        selected
          ? "border-blue-500 ring-2 ring-blue-500/10"
          : "border-slate-200 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/40",
      ].join(" ")}
    >
      {/* Recommended indicator */}

      {recommended && (
        <div className="absolute -top-2.5 left-4 rounded-full bg-blue-600 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wide text-white shadow-sm">
          Recommended
        </div>
      )}

      {/* Header */}

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={[
                "h-2 w-2 shrink-0 rounded-full",
                selected ? "bg-blue-600" : "bg-slate-300",
              ].join(" ")}
            />

            <h3 className="truncate text-sm font-semibold tracking-tight text-slate-950">
              {name}
            </h3>
          </div>

          {description && (
            <p className="mt-1.5 line-clamp-2 text-[11px] leading-5 text-slate-500">
              {description}
            </p>
          )}
        </div>

        {score !== null && (
          <div className="shrink-0 text-right">
            <p className="font-mono text-sm font-medium text-slate-950">
              {score}
            </p>

            <p className="text-[9px] text-slate-400">/ 100</p>
          </div>
        )}
      </div>

      {/* Route metrics */}

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-slate-50 px-3 py-2.5">
          <div className="flex items-center gap-1.5 text-slate-400">
            <MapPin className="h-3 w-3" />

            <span className="text-[9px] font-medium uppercase tracking-wide">
              Distance
            </span>
          </div>

          <p className="mt-1 font-mono text-xs font-medium text-slate-800">
            {distance}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 px-3 py-2.5">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Clock3 className="h-3 w-3" />

            <span className="text-[9px] font-medium uppercase tracking-wide">
              ETA
            </span>
          </div>

          <p className="mt-1 font-mono text-xs font-medium text-slate-800">
            {duration}
          </p>
        </div>
      </div>

      {/* Safety status */}

      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />

          <span className="text-[10px] font-medium text-slate-500">
            Safety
          </span>

          <span className="text-[10px] font-semibold text-emerald-600">
            {safetyLabel}
          </span>
        </div>

        {selected && (
          <span className="text-[9px] font-semibold text-blue-600">
            Selected
          </span>
        )}
      </div>

      {/* Action */}

      <button
        type="button"
        onClick={() => onSelect?.(route)}
        className={[
          "mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5",
          "text-xs font-semibold transition active:scale-[0.98]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",
          selected
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
        ].join(" ")}
      >
        {selected ? "Route selected" : "Select route"}

        <ArrowRight
          className={[
            "h-3.5 w-3.5 transition-transform",
            !selected && "group-hover:translate-x-0.5",
          ].join(" ")}
        />
      </button>
    </article>
  );
}

export default RouteCard;