import { useParams } from "react-router-dom";
import { componentMap } from "../../configs/componentMap";

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
    <>
      <Component />
    </>
  );
};

export default AccountSection;
