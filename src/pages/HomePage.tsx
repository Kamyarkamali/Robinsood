import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";

function HomePage() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<h1>تست ساخت سایدبار</h1>} />
      </Route>
    </Routes>
  );
}

export default HomePage;
