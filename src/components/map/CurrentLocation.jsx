import { Navigation } from "lucide-react";

function CurrentLocation({
  label = "You are here",
  showLabel = true,
  size = "default",
}) {
  const sizes = {
    small: {
      marker: "h-8 w-8",
      icon: "h-3.5 w-3.5",
      ring: "h-12 w-12",
    },
    default: {
      marker: "h-10 w-10",
      icon: "h-4 w-4",
      ring: "h-14 w-14",
    },
    large: {
      marker: "h-12 w-12",
      icon: "h-[18px] w-[18px]",
      ring: "h-16 w-16",
    },
  };

  const currentSize = sizes[size] ?? sizes.default;

  return (
    <div className="relative flex items-center justify-center">
      {/* Location accuracy / safety ring */}

      <span
        aria-hidden="true"
        className={[
          "absolute rounded-full bg-blue-500/10",
          "ring-1 ring-blue-500/20",
          currentSize.ring,
        ].join(" ")}
      />

      {/* Current location marker */}

      <span
        aria-label={label}
        role="img"
        className={[
          "relative z-10 flex items-center justify-center",
          "rounded-full border-[3px] border-white",
          "bg-blue-600 text-white",
          "shadow-lg shadow-blue-600/25",
          currentSize.marker,
        ].join(" ")}
      >
        <Navigation
          className={currentSize.icon}
          fill="currentColor"
          strokeWidth={1.8}
        />
      </span>

      {/* Optional label */}

      {showLabel && (
        <span className="absolute bottom-full left-1/2 mb-3 -translate-x-1/2 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[10px] font-medium text-slate-700 shadow-md shadow-slate-200/40">
          {label}
        </span>
      )}
    </div>
  );
}

export default CurrentLocation;