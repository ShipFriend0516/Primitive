import { useRef, useEffect } from "react";
import ModalLayout from "@/src/Components/common/ModalLayout";
import useModal from "@/src/Hooks/common/useModal";

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

  const { modalRef, isOpen, setIsOpen } = useModal();

  return (
    <div className="w-full">
      <div className={"bg-gray-200 w-full h-52"}>
        <button onClick={() => setIsOpen((prev) => !prev)}>ddddd</button>
      </div>
      <ModalLayout isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className={"w-full bg-gray-200"}>모달이에용</div>
        <div>
          <button>닫기</button>
        </div>
      </ModalLayout>
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
