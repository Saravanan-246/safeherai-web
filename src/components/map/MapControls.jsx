import { LocateFixed, Minus, Plus } from "lucide-react";

function MapControlButton({
  label,
  onClick,
  children,
  disabled = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={[
        "flex h-9 w-9 items-center justify-center",
        "text-slate-600 transition-colors",
        "hover:bg-slate-50 hover:text-slate-950",
        "active:scale-[0.96]",
        "disabled:pointer-events-none disabled:opacity-40",
        "focus-visible:outline-2 focus-visible:outline-offset-[-2px]",
        "focus-visible:outline-blue-500",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function MapControls({
  onZoomIn,
  onZoomOut,
  onLocate,
  showLocate = true,
  disabled = false,
}) {
  return (
    <div
      aria-label="Map controls"
      className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white/95 shadow-md shadow-slate-200/40 backdrop-blur-md"
    >
      <MapControlButton
        label="Zoom in"
        onClick={onZoomIn}
        disabled={disabled}
      >
        <Plus className="h-4 w-4" strokeWidth={2} />
      </MapControlButton>

      <div className="h-px bg-slate-100" />

      <MapControlButton
        label="Zoom out"
        onClick={onZoomOut}
        disabled={disabled}
      >
        <Minus className="h-4 w-4" strokeWidth={2} />
      </MapControlButton>

      {showLocate && (
        <>
          <div className="h-px bg-slate-100" />

          <MapControlButton
            label="Center on my location"
            onClick={onLocate}
            disabled={disabled}
          >
            <LocateFixed className="h-4 w-4" strokeWidth={2} />
          </MapControlButton>
        </>
      )}
    </div>
  );
}

export default MapControls;