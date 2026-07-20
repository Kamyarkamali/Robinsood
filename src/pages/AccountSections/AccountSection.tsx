import { useParams } from "react-router-dom";
import { componentMap } from "../../configs/componentMap";
import AccountNavbar from "../../module/AccountNavbar";
import type { TourScope } from "../../components/tour/tourSteps";

const AccountSection = () => {
  const { section } = useParams<{ section: string }>();

  if (!section) {
    return <h1>404</h1>;
  }

  const Component = componentMap[section as keyof typeof componentMap];

  if (!Component) {
    return <h1>404</h1>;
  }

  return (
    <div>
      <AccountNavbar scope={section as TourScope} />

      <div id="account-pdf">
        <Component />
      </div>
    </div>
  );
};

export default AccountSection;
