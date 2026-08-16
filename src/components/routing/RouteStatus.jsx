import {
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
  Map,
  ShieldCheck,
} from "lucide-react";

const STATUS_CONFIG = {
  idle: {
    icon: Map,
    title: "Ready to plan",
    description: "Enter a destination to find a safer route.",
    className: "bg-slate-50 text-slate-500",
    iconClassName: "text-slate-500",
  },

  searching: {
    icon: LoaderCircle,
    title: "Analyzing routes",
    description: "Finding available routes and safety signals.",
    className: "bg-blue-50 text-blue-700",
    iconClassName: "text-blue-600 animate-spin",
  },

  ready: {
    icon: ShieldCheck,
    title: "Safe route available",
    description: "Route analysis is ready for your journey.",
    className: "bg-emerald-50 text-emerald-700",
    iconClassName: "text-emerald-600",
  },

  navigating: {
    icon: CheckCircle2,
    title: "Journey in progress",
    description: "Your selected route is active.",
    className: "bg-blue-50 text-blue-700",
    iconClassName: "text-blue-600",
  },

  error: {
    icon: AlertCircle,
    title: "Route unavailable",
    description: "We could not calculate a route right now.",
    className: "bg-amber-50 text-amber-700",
    iconClassName: "text-amber-600",
  },
};

function RouteStatus({
  status = "idle",
  title,
  description,
  compact = false,
}) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.idle;
  const Icon = config.icon;

  const resolvedTitle = title ?? config.title;
  const resolvedDescription = description ?? config.description;

  if (compact) {
    return (
      <div
        role="status"
        className={[
          "inline-flex items-center gap-2 rounded-full px-3 py-1.5",
          "text-[10px] font-semibold",
          config.className,
        ].join(" ")}
      >
        <Icon
          className={[
            "h-3 w-3 shrink-0",
            config.iconClassName,
          ].join(" ")}
        />

        <span>{resolvedTitle}</span>
      </div>
    );
  }

  return (
    <section
      role="status"
      aria-live="polite"
      className="rounded-2xl border border-slate-200 bg-white p-4"
    >
      <div className="flex items-start gap-3">
        <div
          className={[
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
            config.className,
          ].join(" ")}
        >
          <Icon
            className={[
              "h-4 w-4",
              config.iconClassName,
            ].join(" ")}
          />
        </div>

        <div className="min-w-0">
          <h3 className="text-xs font-semibold text-slate-900">
            {resolvedTitle}
          </h3>

          <p className="mt-1 text-[11px] leading-5 text-slate-500">
            {resolvedDescription}
          </p>
        </div>
      </div>
    </section>
  );
}

export default RouteStatus;