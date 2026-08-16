import { Activity, ArrowRight, ShieldCheck } from "lucide-react";

import RiskIndicator from "./RiskIndicator";
import SafetyScore from "./SafetyScore";

function SafetyBubbleCard({
  score = 91,
  riskLevel = "low",
  title = "Your Safety Bubble",
  description = "Current area safety conditions look favorable.",
  signalCount = 0,
  onViewDetails,
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {/* Header */}

      <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <ShieldCheck className="h-4 w-4" />
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-tight text-slate-950">
              {title}
            </h2>

            <p className="mt-1 max-w-xs text-[10px] leading-5 text-slate-500">
              {description}
            </p>
          </div>
        </div>

        <span className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-700 sm:flex">
          <Activity className="h-2.5 w-2.5" />
          Live
        </span>
      </div>

      {/* Score */}

      <div className="flex flex-col items-center gap-5 px-5 py-6 sm:flex-row sm:items-center">
        <SafetyScore score={score} />

        <div className="w-full flex-1">
          <RiskIndicator level={riskLevel} />

          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
            <span className="text-[10px] text-slate-400">
              Safety signals
            </span>

            <span className="font-mono text-xs font-medium text-slate-800">
              {signalCount}
            </span>
          </div>
        </div>
      </div>

      {/* Action */}

      <div className="border-t border-slate-100 p-4">
        <button
          type="button"
          onClick={onViewDetails}
          className="group flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-xs font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 active:scale-[0.99]"
        >
          <span>View safety details</span>

          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </article>
  );
}

export default SafetyBubbleCard;