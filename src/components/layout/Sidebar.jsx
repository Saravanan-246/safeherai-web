import {
  Bell,
  ChevronRight,
  Home,
  Map,
  Settings,
  Shield,
  Siren,
  User,
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

function Sidebar({ onSOS }) {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="hidden w-[236px] shrink-0 border-r border-slate-200 bg-white lg:flex lg:min-h-[calc(100vh-64px)] lg:flex-col">
      {/* Navigation */}

      <div className="flex-1 px-3 py-5">
        <nav aria-label="Application navigation">
          {/* Primary */}

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
                  aria-current={active ? "page" : undefined}
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
                    strokeWidth={active ? 2.2 : 1.9}
                  />

                  <span className="flex-1">{item.label}</span>

                  {active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Support */}

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
                  aria-current={active ? "page" : undefined}
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
                    strokeWidth={active ? 2.2 : 1.9}
                  />

                  <span className="flex-1">{item.label}</span>

                  {active && (
                    <ChevronRight className="h-3 w-3 text-blue-500" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Emergency action */}

      <div className="border-t border-slate-100 p-3">
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

      {/* System status */}

      <div className="border-t border-slate-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

            <span className="text-[10px] font-medium text-slate-500">
              System ready
            </span>
          </div>

          <Settings className="h-3.5 w-3.5 text-slate-300" />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;