import { useState } from "react";
import NavBar from "../Components/NavBar";
import primitive23 from "../Images/primitive23.jpg";

const RecruitPage = () => {
  const [showLast, setShowLast] = useState(false);
  return (
    <>
      <NavBar />
      <div className="bg-slate-50 w-screen min-h-screen flex flex-col items-center justify-center py-20">
        <h3 className="text-4xl">지금은 지원기간이 아닙니다!</h3>
        <p>지난 기수 모집 기간: 2월 21일 (화) ~ 3월 13일 (월)</p>
        <button
          className="bg-green-200 py-1 px-4 rounded-lg m-3"
          onClick={() => setShowLast((prev) => !prev)}
        >
          지난 모집공고 {showLast ? "닫기" : "확인하기"}
        </button>
        {showLast ? (
          <div className="flex justify-center items-center overflow-hidden border-2 p-3 rounded-lg">
            <img className="fade_in  w-1/2" src={primitive23} alt="23년도 모집공고"></img>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default RecruitPage;
