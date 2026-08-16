import {
  AlertTriangle,
  CheckCircle2,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";

const STATUS_CONFIG = {
  safe: {
    icon: ShieldCheck,
    label: "Area looks safe",
    description: "Current safety signals are favorable.",
    container: "border-emerald-200 bg-emerald-50/70",
    iconContainer: "bg-emerald-100 text-emerald-700",
    text: "text-emerald-900",
    muted: "text-emerald-700/70",
  },

  caution: {
    icon: AlertTriangle,
    label: "Use additional caution",
    description: "Some safety signals need your attention.",
    container: "border-amber-200 bg-amber-50/70",
    iconContainer: "bg-amber-100 text-amber-700",
    text: "text-amber-900",
    muted: "text-amber-700/70",
  },

  alert: {
    icon: AlertTriangle,
    label: "Safety alert",
    description: "Review the latest safety information.",
    container: "border-red-200 bg-red-50/70",
    iconContainer: "bg-red-100 text-red-700",
    text: "text-red-900",
    muted: "text-red-700/70",
  },

  loading: {
    icon: LoaderCircle,
    label: "Analyzing safety",
    description: "Updating the latest available signals.",
    container: "border-blue-200 bg-blue-50/70",
    iconContainer: "bg-blue-100 text-blue-700",
    text: "text-blue-900",
    muted: "text-blue-700/70",
  },

  unavailable: {
    icon: CheckCircle2,
    label: "Safety data unavailable",
    description: "We could not update the current safety status.",
    container: "border-slate-200 bg-slate-50",
    iconContainer: "bg-slate-100 text-slate-500",
    text: "text-slate-800",
    muted: "text-slate-500",
  },
};

function SafetyStatus({
  status = "safe",
  title,
  description,
  compact = false,
}) {
  const config =
    STATUS_CONFIG[status] ?? STATUS_CONFIG.unavailable;

  const Icon = config.icon;

  const resolvedTitle = title ?? config.label;
  const resolvedDescription =
    description ?? config.description;

  if (compact) {
    return (
      <span
        role="status"
        className={[
          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1",
          "text-[10px] font-semibold",
          config.container,
          config.text,
        ].join(" ")}
      >
        <Icon
          className={[
            "h-3 w-3",
            status === "loading" && "animate-spin",
          ].join(" ")}
        />

        {resolvedTitle}
      </span>
    );
  }

  return (
    <section
      role="status"
      aria-live="polite"
      className={[
        "rounded-2xl border p-4",
        config.container,
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <div
          className={[
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
            config.iconContainer,
          ].join(" ")}
        >
          <Icon
            className={[
              "h-4 w-4",
              status === "loading" && "animate-spin",
            ].join(" ")}
          />
        </div>

        <div className="min-w-0">
          <h3
            className={[
              "text-xs font-semibold",
              config.text,
            ].join(" ")}
          >
            {resolvedTitle}
          </h3>

          <p
            className={[
              "mt-1 text-[10px] leading-5",
              config.muted,
            ].join(" ")}
          >
            {resolvedDescription}
          </p>
        </div>
      </div>
    </section>
  );
}

export default SafetyStatus;