import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import MyAccounts from "./MyAccounts";
import AllAccounts from "./AllAccounts";
import AccountSection from "./AccountSections/AccountSection";
import DashboardWindows from "../components/modals/DashboardWindows";
import MobileBottomNav from "../module/MobileBottomNav";
import DashboardWindowsItem from "../components/modals/DashboardWindowsItem";
import NotFound from "./NotFound";

function ScrollToTopOnMount() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const main = document.querySelector("main");
    if (main) main.scrollTop = 0;

    const container = document.querySelector(".dashboard-content");
    if (container) container.scrollTop = 0;
  }, [pathname]);

  return null;
}

function HomePage() {
  return (
    <>
      <ScrollToTopOnMount />
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<MyAccounts />} />
          {/* @ts-ignore */}
          <Route path="/accounts" element={<AllAccounts />} />
          <Route path="/account/:section" element={<AccountSection />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
      {/* @ts-ignore */}
      <DashboardWindows />
      <DashboardWindowsItem />
      <MobileBottomNav />
    </>
  );
}

export default HomePage;
