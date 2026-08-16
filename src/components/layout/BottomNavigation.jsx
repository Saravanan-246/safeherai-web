import {
  Bell,
  Home,
  Map,
  Shield,
  User,
} from "lucide-react";

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

function BottomNavigation({ activePath = "/home" }) {
  return (
    <nav
      aria-label="Primary navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
    >
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePath === item.path;

          return (
            <a
              key={item.path}
              href={item.path}
              aria-current={isActive ? "page" : undefined}
              className={[
                "flex min-w-[58px] flex-col items-center justify-center gap-1 rounded-xl px-2 py-1.5",
                "text-[10px] font-medium transition-colors active:scale-[0.96]",
                isActive
                  ? "text-blue-600"
                  : "text-slate-400 hover:text-slate-700",
              ].join(" ")}
            >
              <span
                className={[
                  "flex h-7 w-10 items-center justify-center rounded-lg transition-colors",
                  isActive ? "bg-blue-50" : "bg-transparent",
                ].join(" ")}
              >
                <Icon
                  className="h-[17px] w-[17px]"
                  strokeWidth={isActive ? 2.3 : 1.9}
                />
              </span>

              <span>{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNavigation;