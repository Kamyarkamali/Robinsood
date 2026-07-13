import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import MyAccounts from "./MyAccounts";
import AllAccounts from "./AllAccounts";

function HomePage() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<MyAccounts />} />

        <Route path="/accounts" element={<AllAccounts />} />
      </Route>
    </Routes>
  );
}

export default HomePage;
