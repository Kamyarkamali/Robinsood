import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import MyAccounts from "./MyAccounts";
import AllAccounts from "./AllAccounts";
import AccountSection from "./AccountSections/AccountSection";
import DashboardWindows from "../components/modals/DashboardWindows";

function HomePage() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<MyAccounts />} />
          {/*  @ts-ignore */}
          <Route path="/accounts" element={<AllAccounts />} />
          <Route path="/account/:section" element={<AccountSection />} />
        </Route>
      </Routes>
      {/* @ts-ignore */}
      <DashboardWindows />
      {/* <HomePageTest /> */}
    </>
  );
}

export default HomePage;
