import { useState } from "react";
import styled from "styled-components";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import { keyframes } from "styled-components";
import { animated, useSpring, config } from "react-spring";

interface Question {
  question: string;
  answer: string;
}

const QuestionBox = ({ question, answer }: Question) => {
  const [isOpen, setIsOpen] = useState(false);

  // for animaitons
  const [springs, api] = useSpring(() => ({
    from: {
      maxHeight: 0,
      opacity: 0,
      padding: 0,
    },
    config: {
      tension: 280,
    },
  }));

  const handleClick = () => {
    api.start({
      from: { padding: 10 },
      to: {
        padding: springs.padding.get() === 0 ? 10 : 0,
        opacity: springs.opacity.get() === 0 ? 1 : 0,
        maxHeight: springs.maxHeight.get() === 0 ? 400 : 0,
      },
    });
  };

  return (
    <div
      className="md:text-lg text-sm questionBox"
      style={{ backgroundColor: isOpen ? "#2a2d32" : "white" }}
      onClick={() => {
        handleClick();
        setIsOpen((p) => !p);
      }}
    >
      <div className="flex justify-between items-center">
        <div className={`flex gap-1 ${isOpen ? "text-white" : "text-black"} `}>
          <span>Q : </span>
          <p className={`flex-1 `}>{question}</p>
        </div>
        <div>{isOpen ? <FaAngleUp /> : <FaAngleDown />}</div>
      </div>

      <animated.div style={{ color: "black", backgroundColor: "white", ...springs }}>
        <p>A : {answer}</p>
      </animated.div>
    </div>
  );
};

export default QuestionBox;
