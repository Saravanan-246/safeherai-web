import { Bell, Menu, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

import SOSButton from "../emergency/SOSButton";

function MobileHeader({ onMenuClick, onSOS }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl lg:hidden">
      <div className="flex h-14 items-center justify-between px-3 sm:px-4">
        {/* Brand */}

        <Link
          to="/home"
          aria-label="SafeHerAI home"
          className="flex min-w-0 items-center gap-2.5"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 shadow-sm shadow-blue-600/20">
            <ShieldCheck
              className="h-[17px] w-[17px] text-white"
              strokeWidth={2.2}
            />
          </span>

          <span className="truncate text-sm font-semibold tracking-tight text-slate-950">
            SafeHerAI
          </span>
        </Link>

        {/* Actions */}

        <div className="flex items-center gap-1.5">
          {/* Alerts */}

          <Link
            to="/alerts"
            aria-label="View alerts"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 active:scale-[0.96]"
          >
            <Bell className="h-4 w-4" />

            <span
              aria-label="New alerts"
              className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-blue-600 ring-2 ring-white"
            />
          </Link>

          {/* SOS */}

          <SOSButton
            compact
            onClick={onSOS}
          />

          {/* Menu */}

          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 active:scale-[0.96]"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default MobileHeader;