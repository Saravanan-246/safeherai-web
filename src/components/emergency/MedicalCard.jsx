import { ArrowUpRight, HeartPulse, Phone } from "lucide-react";

function MedicalCard({
  phone = "108",
  title = "Medical Assistance",
  description = "Get assistance from the nearest medical emergency service.",
  onAction,
}) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:border-blue-100 hover:shadow-lg hover:shadow-slate-200/40">
      {/* Icon */}

      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <HeartPulse className="h-[18px] w-[18px]" />
        </div>

        <span className="rounded-full bg-blue-50 px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-blue-600">
          Medical
        </span>
      </div>

      {/* Content */}

      <div className="mt-5">
        <h3 className="text-sm font-semibold tracking-tight text-slate-950">
          {title}
        </h3>

        <p className="mt-2 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>

      {/* Emergency number */}

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

      {/* Action */}

      <button
        type="button"
        onClick={onAction}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-xs font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      >
        Request Medical Help

        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </button>
    </article>
  );
}

export default MedicalCard;