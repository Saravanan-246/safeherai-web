import { Siren } from "lucide-react";

function SOSButton({
  onClick,
  label = "SOS",
  disabled = false,
  compact = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label="Activate emergency SOS"
      className={[
        "group relative inline-flex items-center justify-center",
        "font-semibold transition-all duration-200",
        "focus-visible:outline-2 focus-visible:outline-offset-3",
        "focus-visible:outline-red-500",
        "disabled:pointer-events-none disabled:opacity-50",
        "active:scale-[0.97]",
        compact
          ? "h-10 gap-2 rounded-xl px-4 text-xs"
          : "h-12 gap-2.5 rounded-xl px-5 text-sm",
        "bg-red-600 text-white",
        "shadow-sm shadow-red-600/20",
        "hover:bg-red-700 hover:shadow-md hover:shadow-red-600/20",
      ].join(" ")}
    >
      {/* Status indicator */}
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-40" />

        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
      </span>

      {/* Icon */}
      <Siren
        className={[
          "shrink-0",
          compact ? "h-4 w-4" : "h-[18px] w-[18px]",
        ].join(" ")}
        strokeWidth={2}
      />

      {/* Label */}
      <span>{label}</span>
    </button>
  );
}

export default SOSButton;