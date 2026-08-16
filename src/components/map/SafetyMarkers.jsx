import {
  AlertTriangle,
  CheckCircle2,
  Hospital,
  Shield,
  Siren,
} from "lucide-react";

const MARKER_TYPES = {
  safe: {
    icon: CheckCircle2,
    className: "bg-emerald-500 text-white",
    ring: "ring-emerald-500/15",
    label: "Verified safe",
  },

  caution: {
    icon: AlertTriangle,
    className: "bg-amber-500 text-white",
    ring: "ring-amber-500/15",
    label: "Safety signal",
  },

  police: {
    icon: Shield,
    className: "bg-blue-600 text-white",
    ring: "ring-blue-600/15",
    label: "Police assistance",
  },

  medical: {
    icon: Hospital,
    className: "bg-blue-600 text-white",
    ring: "ring-blue-600/15",
    label: "Medical assistance",
  },

  emergency: {
    icon: Siren,
    className: "bg-red-600 text-white",
    ring: "ring-red-600/15",
    label: "Emergency",
  },
};

function SafetyMarker({ marker }) {
  const config = MARKER_TYPES[marker.type] ?? MARKER_TYPES.caution;
  const Icon = config.icon;

  return (
    <div
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
      style={{
        left: marker.x,
        top: marker.y,
      }}
    >
      {/* Marker ring */}

      <span
        aria-hidden="true"
        className={[
          "absolute inset-0 -m-2 rounded-full ring-8",
          config.ring,
        ].join(" ")}
      />

      {/* Marker */}

      <button
        type="button"
        aria-label={marker.label ?? config.label}
        title={marker.label ?? config.label}
        onClick={() => marker.onClick?.(marker)}
        className={[
          "relative flex h-8 w-8 items-center justify-center",
          "rounded-full border-2 border-white shadow-md",
          "transition-transform duration-150 hover:scale-110",
          "active:scale-[0.96]",
          "focus-visible:outline-2 focus-visible:outline-offset-2",
          "focus-visible:outline-blue-500",
          config.className,
        ].join(" ")}
      >
        <Icon
          className="h-3.5 w-3.5"
          strokeWidth={2.2}
        />
      </button>

      {/* Optional marker label */}

      {marker.showLabel && (
        <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 shadow-md shadow-slate-200/40">
          <p className="text-[9px] font-semibold text-slate-700">
            {marker.label ?? config.label}
          </p>
        </div>
      )}
    </div>
  );
}

function SafetyMarkers({
  markers = [],
}) {
  if (!Array.isArray(markers) || markers.length === 0) {
    return null;
  }

  return (
    <>
      {markers.map((marker) => {
        if (
          !marker ||
          typeof marker.x !== "string" ||
          typeof marker.y !== "string"
        ) {
          return null;
        }

        return (
          <SafetyMarker
            key={marker.id}
            marker={marker}
          />
        );
      })}
    </>
  );
}

export default SafetyMarkers;