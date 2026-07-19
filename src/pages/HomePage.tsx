import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import MyAccounts from "./MyAccounts";
import AllAccounts from "./AllAccounts";
import AccountSection from "./AccountSections/AccountSection";

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

      {/* <HomePageTest /> */}
    </>
  );
}

export default HomePage;
