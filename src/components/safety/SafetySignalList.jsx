import { Radio } from "lucide-react";

import SafetySignal from "./SafetySignal";

function SafetySignalList({
  signals = [],
  title = "Safety signals",
  emptyTitle = "No recent signals",
  emptyDescription = "There are no relevant safety signals to display.",
}) {
  const validSignals = Array.isArray(signals)
    ? signals.filter((signal) => signal?.id)
    : [];

  return (
    <section
      aria-label={title}
      className="w-full rounded-2xl border border-slate-200 bg-white"
    >
      {/* Header */}

      <header className="flex items-center justify-between border-b border-slate-100 px-4 py-3.5 sm:px-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Radio className="h-3.5 w-3.5" />
          </div>

          <div>
            <h2 className="text-xs font-semibold tracking-tight text-slate-900">
              {title}
            </h2>

            <p className="mt-0.5 text-[9px] text-slate-400">
              Recent signals around your journey
            </p>
          </div>
        </div>

        {validSignals.length > 0 && (
          <span className="rounded-full bg-slate-100 px-2 py-1 font-mono text-[9px] font-medium text-slate-500">
            {validSignals.length}
          </span>
        )}
      </header>

      {/* Signals */}

      {validSignals.length > 0 ? (
        <div className="divide-y divide-slate-100">
          {validSignals.map((signal) => (
            <div key={signal.id} className="p-3 sm:p-4">
              <SafetySignal {...signal} />
            </div>
          ))}
        </div>
      ) : (
        <div className="px-5 py-10 text-center">
          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
            <Radio className="h-4 w-4" />
          </div>

          <h3 className="mt-3 text-xs font-semibold text-slate-700">
            {emptyTitle}
          </h3>

          <p className="mx-auto mt-1.5 max-w-xs text-[10px] leading-5 text-slate-400">
            {emptyDescription}
          </p>
        </div>
      )}
    </section>
  );
}

export default SafetySignalList;