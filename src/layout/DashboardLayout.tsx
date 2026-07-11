import { Outlet } from "react-router-dom";
import SaidbarComponent from "../components/saidbar/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen">
      <SaidbarComponent />

      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
