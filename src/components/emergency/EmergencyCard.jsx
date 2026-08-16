import { ArrowUpRight, Phone, ShieldAlert } from "lucide-react";

function EmergencyCard({
  title = "Emergency Assistance",
  description = "Get immediate access to essential emergency help.",
  actionLabel = "Get Help",
  phone,
  variant = "default",
  onAction,
}) {
  const isCritical = variant === "critical";

  return (
    <article
      className={[
        "group relative overflow-hidden rounded-2xl border bg-white p-5",
        "transition duration-200 hover:shadow-lg hover:shadow-slate-200/50",
        isCritical
          ? "border-red-200"
          : "border-slate-200 hover:border-blue-100",
      ].join(" ")}
    >
      {/* Header */}

      <div className="flex items-start justify-between gap-4">
        <div
          className={[
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            isCritical
              ? "bg-red-50 text-red-600"
              : "bg-blue-50 text-blue-600",
          ].join(" ")}
        >
          <ShieldAlert className="h-[18px] w-[18px]" />
        </div>

        <span
          className={[
            "rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wide",
            isCritical
              ? "bg-red-50 text-red-600"
              : "bg-slate-100 text-slate-500",
          ].join(" ")}
        >
          Emergency
        </span>
      </div>

      {/* Content */}

      <div className="mt-5">
        <h3 className="text-sm font-semibold tracking-tight text-slate-950">
          {title}
        </h3>

        <p className="mt-2 max-w-sm text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>

      {/* Phone */}

      {phone && (
        <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50">
            <Phone className="h-3.5 w-3.5 text-slate-500" />
          </div>

          <div>
            <p className="text-[9px] font-medium uppercase tracking-wider text-slate-400">
              Emergency number
            </p>

            <p className="mt-0.5 font-mono text-sm font-medium text-slate-900">
              {phone}
            </p>
          </div>
        </div>
      )}

      {/* Action */}

      <button
        type="button"
        onClick={onAction}
        className={[
          "mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3",
          "text-xs font-semibold transition active:scale-[0.98]",
          "focus-visible:outline-2 focus-visible:outline-offset-2",
          isCritical
            ? "bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-500"
            : "bg-blue-600 text-white hover:bg-blue-700 focus-visible:outline-blue-500",
        ].join(" ")}
      >
        {actionLabel}

        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
    </article>
  );
}

export default EmergencyCard;