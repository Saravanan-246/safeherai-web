import { AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";

const RISK_LEVELS = {
  low: {
    label: "Low risk",
    description: "Favorable safety conditions",
    icon: CheckCircle2,
    className: "bg-emerald-50 text-emerald-700",
    iconClassName: "text-emerald-600",
  },

  medium: {
    label: "Moderate risk",
    description: "Some caution advised",
    icon: AlertTriangle,
    className: "bg-amber-50 text-amber-700",
    iconClassName: "text-amber-600",
  },

  high: {
    label: "High risk",
    description: "Additional caution recommended",
    icon: ShieldAlert,
    className: "bg-red-50 text-red-700",
    iconClassName: "text-red-600",
  },
};

function RiskIndicator({
  level = "low",
  compact = false,
}) {
  const config = RISK_LEVELS[level] ?? RISK_LEVELS.medium;
  const Icon = config.icon;

  if (compact) {
    return (
      <span
        className={[
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1",
          "text-[10px] font-semibold",
          config.className,
        ].join(" ")}
      >
        <Icon
          className={[
            "h-3 w-3",
            config.iconClassName,
          ].join(" ")}
        />

        {config.label}
      </span>
    );
  }

  return (
    <div
      className={[
        "flex items-center gap-3 rounded-xl px-3 py-2.5",
        config.className,
      ].join(" ")}
    >
      <Icon
        className={[
          "h-4 w-4 shrink-0",
          config.iconClassName,
        ].join(" ")}
      />

      <div className="min-w-0">
        <p className="text-xs font-semibold">
          {config.label}
        </p>

        <p className="mt-0.5 text-[10px] opacity-75">
          {config.description}
        </p>
      </div>
    </div>
  );
}

export default RiskIndicator;