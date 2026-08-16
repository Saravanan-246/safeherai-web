import {
  Bell,
  ChevronDown,
  Menu,
  ShieldCheck,
  Siren,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import SOSButton from "../emergency/SOSButton";

const navigationItems = [
  {
    label: "Home",
    path: "/home",
  },
  {
    label: "Safe Route",
    path: "/safe-route",
  },
  {
    label: "Safety Bubble",
    path: "/safety-bubble",
  },
  {
    label: "Alerts",
    path: "/alerts",
  },
  {
    label: "Emergency",
    path: "/emergency",
    icon: Siren,
  },
];

function Header({ onMenuClick, onSOS }) {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between gap-4 px-4 sm:px-6">
        {/* Brand */}

        <Link
          to="/home"
          aria-label="SafeHerAI home"
          className="flex shrink-0 items-center gap-2.5"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 shadow-sm shadow-blue-600/20">
            <ShieldCheck
              className="h-[17px] w-[17px] text-white"
              strokeWidth={2.2}
            />
          </span>

          <span className="hidden leading-none sm:block">
            <span className="block text-sm font-semibold tracking-tight text-slate-950">
              SafeHerAI
            </span>

            <span className="mt-1 block text-[9px] font-medium uppercase tracking-[0.14em] text-slate-400">
              Safety Intelligence
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}

        <nav
          aria-label="Primary navigation"
          className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex"
        >
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                aria-current={active ? "page" : undefined}
                className={[
                  "flex items-center gap-1.5 rounded-lg px-3 py-2 text-[11px] font-medium",
                  "whitespace-nowrap transition-colors",
                  active
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
                ].join(" ")}
              >
                {Icon && (
                  <Icon
                    className="h-3.5 w-3.5"
                    strokeWidth={active ? 2.2 : 1.9}
                  />
                )}

                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}

        <div className="flex shrink-0 items-center gap-2">
          {/* System status */}

          <div className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 xl:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

            <span className="text-[10px] font-medium text-slate-500">
              System ready
            </span>
          </div>

          {/* Alerts */}

          <Link
            to="/alerts"
            aria-label="View alerts"
            className={[
              "relative flex h-9 w-9 items-center justify-center rounded-lg",
              "border border-slate-200 text-slate-500",
              "transition hover:bg-slate-50 hover:text-slate-900",
              "active:scale-[0.96]",
            ].join(" ")}
          >
            <Bell className="h-4 w-4" />

            <span
              aria-hidden="true"
              className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-blue-600 ring-2 ring-white"
            />
          </Link>

          {/* SOS */}

          <SOSButton
            compact
            onClick={onSOS}
            label="SOS"
          />

          {/* Profile */}

          <Link
            to="/profile"
            aria-label="Open profile"
            className="hidden h-9 items-center gap-2 rounded-lg border border-slate-200 px-2.5 transition hover:bg-slate-50 sm:flex"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 text-[10px] font-semibold text-slate-600">
              U
            </span>

            <ChevronDown className="h-3 w-3 text-slate-400" />
          </Link>

          {/* Mobile menu */}

          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 active:scale-[0.96] lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;