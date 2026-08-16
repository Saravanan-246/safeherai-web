import {
  AlertTriangle,
  CheckCircle2,
  Info,
  MapPin,
} from "lucide-react";

const SIGNAL_TYPES = {
  positive: {
    icon: CheckCircle2,
    iconClassName: "text-emerald-600",
    background: "bg-emerald-50",
  },

  caution: {
    icon: AlertTriangle,
    iconClassName: "text-amber-600",
    background: "bg-amber-50",
  },

  info: {
    icon: Info,
    iconClassName: "text-blue-600",
    background: "bg-blue-50",
  },
};

function SafetySignal({
  type = "info",
  title = "Safety signal",
  description,
  location,
  time,
}) {
  const config = SIGNAL_TYPES[type] ?? SIGNAL_TYPES.info;
  const Icon = config.icon;

  return (
    <article className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3.5 transition hover:border-slate-300">
      <div
        className={[
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
          config.background,
        ].join(" ")}
      >
        <Icon
          className={[
            "h-4 w-4",
            config.iconClassName,
          ].join(" ")}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xs font-semibold text-slate-900">
            {title}
          </h3>

          {time && (
            <span className="shrink-0 font-mono text-[9px] text-slate-400">
              {time}
            </span>
          )}
        </div>

        {description && (
          <p className="mt-1 text-[10px] leading-5 text-slate-500">
            {description}
          </p>
        )}

        {location && (
          <div className="mt-2 flex items-center gap-1.5 text-slate-400">
            <MapPin className="h-3 w-3" />

            <span className="truncate text-[9px]">
              {location}
            </span>
          </div>
        )}
      </div>
    </article>
  );
}

export default SafetySignal;