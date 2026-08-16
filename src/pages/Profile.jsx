import {
  Bell,
  ChevronRight,
  MapPin,
  ShieldCheck,
  User,
} from "lucide-react";

import PageContainer from "../components/layout/PageContainer";
import StatusPill from "../components/ui/StatusPill";

const settings = [
  {
    icon: Bell,
    title: "Safety Alerts",
    description: "Receive important safety updates during your journey.",
    status: "Enabled",
  },
  {
    icon: MapPin,
    title: "Location Access",
    description: "Allow SafeHerAI to use your location for journey safety.",
    status: "Enabled",
  },
  {
    icon: ShieldCheck,
    title: "Safety Bubble",
    description: "Keep journey safety awareness active while travelling.",
    status: "Active",
  },
];

function Profile({
  user = {
    name: "SafeHerAI User",
    email: "user@example.com",
  },
  onSettingClick,
}) {
  return (
    <PageContainer size="narrow">
      {/* =====================================================
          HEADER
          ===================================================== */}

      <header className="mb-6">
        <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-blue-600">
          Account
        </p>

        <h1 className="mt-2 text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
          Profile & safety settings
        </h1>

        <p className="mt-1.5 max-w-lg text-xs leading-5 text-slate-500">
          Manage your profile and the safety features used during
          your journeys.
        </p>
      </header>

      {/* =====================================================
          PROFILE CARD
          ===================================================== */}

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <User className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold text-slate-950">
                {user.name}
              </h2>

              <p className="mt-1 truncate text-[11px] text-slate-400">
                {user.email}
              </p>
            </div>
          </div>

          <StatusPill status="success">
            Account active
          </StatusPill>
        </div>
      </section>

      {/* =====================================================
          SAFETY SETTINGS
          ===================================================== */}

      <section className="mt-5">
        <div className="mb-3">
          <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-slate-400">
            Safety preferences
          </p>

          <h2 className="mt-1.5 text-sm font-semibold text-slate-900">
            Journey protection
          </h2>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {settings.map((setting, index) => {
            const Icon = setting.icon;

            return (
              <button
                key={setting.title}
                type="button"
                onClick={() => onSettingClick?.(setting)}
                className={[
                  "group flex w-full items-center gap-3.5 p-4 text-left",
                  "transition hover:bg-slate-50",
                  index !== settings.length - 1
                    ? "border-b border-slate-100"
                    : "",
                ].join(" ")}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Icon className="h-4 w-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-xs font-semibold text-slate-900">
                    {setting.title}
                  </h3>

                  <p className="mt-1 text-[10px] leading-5 text-slate-500">
                    {setting.description}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <span className="hidden rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-700 sm:block">
                    {setting.status}
                  </span>

                  <ChevronRight className="h-3.5 w-3.5 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-500" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          SYSTEM INFORMATION
          ===================================================== */}

      <section className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm">
            <ShieldCheck className="h-3.5 w-3.5" />
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-800">
              Your safety preferences stay in one place.
            </p>

            <p className="mt-1 text-[10px] leading-5 text-slate-500">
              Location, alerts, and journey protection settings can
              be updated here as the SafeHerAI experience grows.
            </p>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}

export default Profile;