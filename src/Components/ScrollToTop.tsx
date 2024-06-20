import React, { useEffect, useState } from "react";
import { HiArrowUp } from "react-icons/hi2";
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div
      onClick={scrollToTop}
      className={`scroll-to-top bottom-4 right-4 lg:bottom-10 lg:right-10 shadow-lg text-xl border border-gray-800 hover:shadow-gray-400 ${
        isVisible ? "flex" : "hidden"
      }`}
    >
      {isVisible && <HiArrowUp />}
    </div>
  );
};

export default ScrollToTop;
