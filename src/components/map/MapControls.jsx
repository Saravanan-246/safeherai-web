import { LocateFixed, Minus, Plus } from "lucide-react";

function MapControlButton({
  label,
  onClick,
  children,
  disabled = false,
  mobile = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={[
        "flex items-center justify-center text-slate-600",
        "transition-colors duration-150",
        "hover:bg-slate-50 hover:text-slate-950",
        "active:scale-[0.95]",
        "disabled:pointer-events-none disabled:opacity-40",
        "focus-visible:outline-2 focus-visible:outline-offset-[-2px]",
        "focus-visible:outline-blue-500",
        mobile
          ? "h-10 w-10 sm:h-9 sm:w-9"
          : "h-9 w-9",
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
  compact = false,
}) {
  return (
    <div
      aria-label="Map controls"
      className={[
        "flex overflow-hidden border border-slate-200 bg-white/95",
        "shadow-md shadow-slate-900/10 backdrop-blur-md",
        compact
          ? "flex-row rounded-full"
          : "flex-col rounded-xl sm:rounded-xl",
      ].join(" ")}
    >
      <MapControlButton
        label="Zoom in"
        onClick={onZoomIn}
        disabled={disabled}
        mobile={compact}
      >
        <Plus
          className="h-4 w-4"
          strokeWidth={2}
        />
      </MapControlButton>

      {!compact && (
        <div className="h-px bg-slate-100" />
      )}

      {compact && (
        <div className="my-2 w-px bg-slate-100" />
      )}

      <MapControlButton
        label="Zoom out"
        onClick={onZoomOut}
        disabled={disabled}
        mobile={compact}
      >
        <Minus
          className="h-4 w-4"
          strokeWidth={2}
        />
      </MapControlButton>

      {showLocate && (
        <>
          {compact ? (
            <div className="my-2 w-px bg-slate-100" />
          ) : (
            <div className="h-px bg-slate-100" />
          )}

          <MapControlButton
            label="Center on my location"
            onClick={onLocate}
            disabled={disabled}
            mobile={compact}
          >
            <LocateFixed
              className="h-4 w-4"
              strokeWidth={2}
            />
          </MapControlButton>
        </>
      )}
    </div>
  );
}

export default MapControls;