import { Outlet } from "react-router-dom";

import BottomNavigation from "./BottomNavigation";
import Header from "./Header";
import MobileHeader from "./MobileHeader";
import Sidebar from "./Sidebar";

function AppShell() {
  return (
    <div className="app-root bg-white text-slate-950">
      <div className="hidden lg:block">
        <Header />
      </div>

      <div className="lg:hidden">
        <MobileHeader />
      </div>

      <div className="flex min-h-[calc(100dvh-64px)]">
        <Sidebar />

        <main className="min-w-0 flex-1 pb-20 lg:pb-0">
          <Outlet />
        </main>
      </div>

      <BottomNavigation />
    </div>
  );
}

export default AppShell;