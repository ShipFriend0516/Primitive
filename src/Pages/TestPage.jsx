import { useRef, useEffect } from "react";

const TestPage = () => {
  const moon = useRef(null);

  useEffect(() => {
    const callbackFx = (e) => {
      console.log(e);
      if (e[0].isIntersecting) {
        console.log("이녀석 드디어 찾았다..!");
        moon.current.innerText = "🌝";
      } else {
        moon.current.innerText = "🌚";
      }
    };

    if (moon.current) {
      const observer = new IntersectionObserver(callbackFx, { threshold: 0.9 });
      observer.observe(moon.current);
    }
  }, []);

  return (
    <div className="w-full">
      <div className="h-screen"></div>
      <div className="h-screen"></div>
      <span className="text-9xl" ref={moon}>
        🌚
      </span>
      <div className="h-screen"></div>
    </div>
  );
};

export default TestPage;
