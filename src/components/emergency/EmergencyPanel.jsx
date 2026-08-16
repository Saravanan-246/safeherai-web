import { Phone, ShieldAlert, X } from "lucide-react";
import EmergencyCard from "./EmergencyCard";

function EmergencyPanel({
  open = true,
  onClose,
  onPolice,
  onMedical,
  onSOS,
}) {
  if (!open) return null;

  return (
    <section
      aria-label="Emergency assistance"
      className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/40"
    >
      {/* Header */}

      <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <ShieldAlert className="h-4.5 w-4.5" />
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-tight text-slate-950">
              Emergency Assistance
            </h2>

            <p className="mt-0.5 text-[11px] text-slate-400">
              Get help when every second matters
            </p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close emergency panel"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 active:scale-[0.96]"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </header>

      {/* Status */}

      <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

          <span className="text-[11px] font-medium text-slate-600">
            Your current location is available for assistance
          </span>
        </div>
      </div>

      {/* Emergency actions */}

      <div className="grid gap-3 p-4 sm:grid-cols-3">
        <EmergencyCard
          title="Police Assistance"
          description="Request assistance from police services."
          phone="100"
          actionLabel="Police Help"
          onAction={onPolice}
        />

        <EmergencyCard
          title="Medical Assistance"
          description="Get assistance from medical emergency services."
          phone="108"
          actionLabel="Medical Help"
          onAction={onMedical}
        />

        <EmergencyCard
          title="Emergency SOS"
          description="Use SOS for immediate emergency assistance."
          actionLabel="Activate SOS"
          variant="critical"
          onAction={onSOS}
        />
      </div>

      {/* Footer */}

      <footer className="flex items-center gap-2 border-t border-slate-100 px-5 py-3">
        <Phone className="h-3.5 w-3.5 text-slate-400" />

        <p className="text-[10px] leading-4 text-slate-400">
          Emergency actions should only be used when assistance is required.
        </p>
      </footer>
    </section>
  );
}

export default EmergencyPanel;