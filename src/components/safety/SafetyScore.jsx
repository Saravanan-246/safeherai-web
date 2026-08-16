import { ShieldCheck } from "lucide-react";

function SafetyScore({
  score = 0,
  label = "Safety score",
  size = "default",
}) {
  const normalizedScore = Math.max(
    0,
    Math.min(100, Number(score) || 0),
  );

  const sizes = {
    small: {
      wrapper: "h-14 w-14",
      score: "text-sm",
      label: "text-[8px]",
    },

    default: {
      wrapper: "h-20 w-20",
      score: "text-xl",
      label: "text-[8px]",
    },

    large: {
      wrapper: "h-24 w-24",
      score: "text-2xl",
      label: "text-[9px]",
    },
  };

  const currentSize = sizes[size] ?? sizes.default;

  return (
    <div className="flex flex-col items-center">
      <div
        className={[
          "relative flex items-center justify-center rounded-full",
          "border-[5px] border-blue-100 bg-white",
          currentSize.wrapper,
        ].join(" ")}
      >
        {/* Progress ring */}

        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full -rotate-90"
          aria-hidden="true"
        >
          <circle
            cx="50"
            cy="50"
            r="43"
            fill="none"
            stroke="currentColor"
            strokeWidth="7"
            className="text-blue-600"
            strokeLinecap="round"
            strokeDasharray={`${normalizedScore * 2.7} 270`}
          />
        </svg>

        <div className="relative z-10 flex flex-col items-center">
          <ShieldCheck className="mb-0.5 h-3.5 w-3.5 text-blue-600" />

          <span
            className={[
              "font-semibold tracking-tight text-slate-950",
              currentSize.score,
            ].join(" ")}
          >
            {Math.round(normalizedScore)}
          </span>
        </div>
      </div>

      <span
        className={[
          "mt-2 font-medium uppercase tracking-[0.12em] text-slate-400",
          currentSize.label,
        ].join(" ")}
      >
        {label}
      </span>
    </div>
  );
}

export default SafetyScore;