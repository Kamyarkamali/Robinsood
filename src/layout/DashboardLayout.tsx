import { Outlet } from "react-router-dom";
import SaidbarComponent from "../components/saidbar/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen pt-7 md:pt-0">
      <SaidbarComponent />

      <main className="flex-1 overflow-auto p-6 pb-27">
        <Outlet />
      </main>
    </div>
  );
}
