import {
  AlertTriangle,
  HeartPulse,
  ShieldCheck,
  Siren,
} from "lucide-react";

import EmergencyPanel from "../components/emergency/EmergencyPanel";
import PageContainer from "../components/layout/PageContainer";
import StatusPill from "../components/ui/StatusPill";

function Emergency({
  onSOS,
  onPolice,
  onMedical,
}) {
  return (
    <PageContainer size="narrow">
      {/* =====================================================
          Page Header
          ===================================================== */}

      <header className="mb-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600">
            <Siren className="h-3.5 w-3.5" />
          </div>

          <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-red-600">
            Emergency centre
          </p>
        </div>

        <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
              Emergency assistance
            </h1>

            <p className="mt-1.5 max-w-lg text-xs leading-5 text-slate-500">
              Get immediate access to SOS, police, and medical
              assistance when you need it.
            </p>
          </div>

          <StatusPill status="active">
            Emergency services
          </StatusPill>
        </div>
      </header>

      {/* =====================================================
          Emergency Warning
          ===================================================== */}

      <section className="mb-5 rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <AlertTriangle className="h-4 w-4" />
          </div>

          <div>
            <h2 className="text-xs font-semibold text-amber-900">
              Use emergency actions when needed
            </h2>

            <p className="mt-1 text-[10px] leading-5 text-amber-800/70">
              Choose the assistance option that best matches
              your situation. For immediate danger, use SOS.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          Emergency Panel
          ===================================================== */}

      <EmergencyPanel
        onSOS={onSOS}
        onPolice={onPolice}
        onMedical={onMedical}
      />

      {/* =====================================================
          Trust / System Information
          ===================================================== */}

      <section className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <ShieldCheck className="h-3.5 w-3.5" />
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-800">
                Safety first
              </p>

              <p className="mt-0.5 text-[9px] text-slate-400">
                Emergency tools are kept easy to access.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <HeartPulse className="h-3.5 w-3.5" />
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-800">
                Assistance options
              </p>

              <p className="mt-0.5 text-[9px] text-slate-400">
                Police and medical assistance are available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          Footer Note
          ===================================================== */}

      <p className="mt-5 text-center text-[9px] leading-4 text-slate-400">
        Emergency information and service availability may
        vary by location.
      </p>
    </PageContainer>
  );
}

export default Emergency;