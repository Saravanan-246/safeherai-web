import {
  Bell,
  Home,
  Map,
  Shield,
  User,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navigationItems = [
  {
    label: "Home",
    icon: Home,
    path: "/home",
  },
  {
    label: "Route",
    icon: Map,
    path: "/safe-route",
  },
  {
    label: "Safety",
    icon: Shield,
    path: "/safety-bubble",
  },
  {
    label: "Alerts",
    icon: Bell,
    path: "/alerts",
  },
  {
    label: "Profile",
    icon: User,
    path: "/profile",
  },
];

function BottomNavigation() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav
      aria-label="Mobile navigation"
      className={[
        "fixed inset-x-0 bottom-0 z-[60]",
        "border-t border-slate-200",
        "bg-white/95 backdrop-blur-xl",
        "lg:hidden",
        "pb-[env(safe-area-inset-bottom)]",
      ].join(" ")}
    >
      <div className="mx-auto flex h-16 w-full max-w-lg items-stretch px-1.5">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              aria-current={
                active ? "page" : undefined
              }
              className={[
                "flex min-w-0 flex-1 flex-col items-center justify-center",
                "gap-0.5 rounded-xl px-1 py-1.5",
                "text-[10px] font-medium",
                "transition-colors duration-150",
                "active:scale-[0.96]",
                active
                  ? "text-blue-600"
                  : "text-slate-400 hover:text-slate-700",
              ].join(" ")}
            >
              <span
                className={[
                  "flex h-8 w-11 items-center justify-center rounded-xl",
                  "transition-colors duration-150",
                  active
                    ? "bg-blue-50"
                    : "bg-transparent",
                ].join(" ")}
              >
                <Icon
                  className="h-[17px] w-[17px]"
                  strokeWidth={active ? 2.2 : 1.8}
                />
              </span>

              <span className="leading-none">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNavigation;