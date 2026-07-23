import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });

      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      const mainContent = document.querySelector("main");
      if (mainContent) {
        mainContent.scrollTop = 0;
      }
    };

    scrollToTop();

    const timeoutId = setTimeout(scrollToTop, 100);

    const timeoutId2 = setTimeout(scrollToTop, 300);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeoutId2);
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;
