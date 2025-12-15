// MyComponents/Dashboard/DashboardLayout.tsx
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-black text-white">
      <h1 className="p-4 text-xl font-bold">Dashboard LayOut</h1>
      <Outlet />
    </div>
  );
}
