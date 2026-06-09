import LanguageSwitcher from "./common/LanguageSwitcher";
import ThemeToggle from "./common/ThemeToggle";

function Navbar() {
  return (
    <div className="flex items-center gap-3 pt-4">
      <LanguageSwitcher />
      <ThemeToggle />
    </div>
  );
}

export default Navbar;
