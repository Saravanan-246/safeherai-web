import {
  Bell,
  ChevronRight,
  Home,
  Map,
  Shield,
  Siren,
  User,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import SOSButton from "../emergency/SOSButton";

const primaryNavigation = [
  {
    label: "Overview",
    path: "/home",
    icon: Home,
  },
  {
    label: "Safe Route",
    path: "/safe-route",
    icon: Map,
  },
  {
    label: "Safety Bubble",
    path: "/safety-bubble",
    icon: Shield,
  },
  {
    label: "Alerts",
    path: "/alerts",
    icon: Bell,
  },
];

const supportNavigation = [
  {
    label: "Emergency",
    path: "/emergency",
    icon: Siren,
  },
  {
    label: "Profile",
    path: "/profile",
    icon: User,
  },
];

function Sidebar({
  onSOS,
  mobileOpen = false,
  onClose,
}) {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path;

  const handleNavigation = () => {
    onClose?.();
  };

  return (
    <>
      {/* =====================================================
          MOBILE BACKDROP
          ===================================================== */}

      <div
        aria-hidden={!mobileOpen}
        onClick={onClose}
        className={[
          "fixed inset-0 z-[70] bg-slate-950/30 backdrop-blur-[2px]",
          "transition-opacity duration-200 lg:hidden",
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        ].join(" ")}
      />

      {/* =====================================================
          SIDEBAR
          ===================================================== */}

      <aside
        aria-label="Application navigation"
        className={[
          /* Base */
          "z-[80] flex w-[236px] shrink-0 flex-col border-r border-slate-200 bg-white",

          /* Desktop */
          "lg:static lg:min-h-[calc(100dvh-64px)] lg:translate-x-0",

          /* Mobile drawer */
          "fixed inset-y-0 left-0 lg:relative",
          "min-h-dvh",
          "shadow-[16px_0_40px_rgba(15,23,42,0.08)] lg:shadow-none",

          "transition-transform duration-200 ease-out",
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        {/* ===================================================
            MOBILE DRAWER HEADER
            =================================================== */}

        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-4 lg:hidden">
          <div>
            <p className="text-sm font-semibold tracking-tight text-slate-950">
              SafeHerAI
            </p>

            <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.14em] text-slate-400">
              Safety Intelligence
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 active:scale-[0.96]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ===================================================
            NAVIGATION
            =================================================== */}

        <div className="flex-1 overflow-y-auto px-3 py-5">
          <nav aria-label="Application navigation">
            {/* Workspace */}

            <p className="px-3 pb-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Workspace
            </p>

            <div className="space-y-0.5">
              {primaryNavigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={handleNavigation}
                    aria-current={
                      active ? "page" : undefined
                    }
                    className={[
                      "group flex items-center gap-3 rounded-lg px-3 py-2.5",
                      "text-xs font-medium transition-colors",
                      active
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
                    ].join(" ")}
                  >
                    <Icon
                      className="h-[16px] w-[16px] shrink-0"
                      strokeWidth={
                        active ? 2.2 : 1.9
                      }
                    />

                    <span className="flex-1">
                      {item.label}
                    </span>

                    {active && (
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Assistance */}

            <p className="mt-7 px-3 pb-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Assistance
            </p>

            <div className="space-y-0.5">
              {supportNavigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={handleNavigation}
                    aria-current={
                      active ? "page" : undefined
                    }
                    className={[
                      "group flex items-center gap-3 rounded-lg px-3 py-2.5",
                      "text-xs font-medium transition-colors",
                      active
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
                    ].join(" ")}
                  >
                    <Icon
                      className="h-[16px] w-[16px] shrink-0"
                      strokeWidth={
                        active ? 2.2 : 1.9
                      }
                    />

                    <span className="flex-1">
                      {item.label}
                    </span>

                    {active && (
                      <ChevronRight className="h-3 w-3 text-blue-500" />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>

        {/* ===================================================
            EMERGENCY
            =================================================== */}

        <div className="border-t border-slate-100 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] lg:pb-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
            <div className="mb-3">
              <p className="text-[11px] font-semibold text-slate-800">
                Need immediate help?
              </p>

              <p className="mt-1 text-[10px] leading-4 text-slate-400">
                Emergency assistance is always available.
              </p>
            </div>

            <SOSButton
              compact
              onClick={onSOS}
              label="Activate SOS"
            />
          </div>
        </div>

        {/* ===================================================
            SYSTEM STATUS
            =================================================== */}

        <div className="border-t border-slate-100 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

            <span className="text-[10px] font-medium text-slate-500">
              System ready
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;