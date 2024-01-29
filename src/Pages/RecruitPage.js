import { useState } from "react";
import NavBar from "../Components/NavBar";
import primitive23 from "../Images/primitive23.jpg";

const RecruitPage = () => {
  const [showLast, setShowLast] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [loading, setLoading] = useState(true);
  return (
    <>
      <NavBar />
      <div className="bg-slate-50 w-screen min-h-screen flex flex-col items-center justify-center py-20">
        <h3 className="text-4xl">지금은 지원기간이 아닙니다!</h3>
        <p>2024년 모집 기간: 2월 13일 (화) ~ 3월 11일 (월)</p>
        <button
          className="bg-green-200 py-1 px-4 rounded-lg m-3 hover:bg-green-300"
          onClick={() => setShowLast((prev) => !prev)}
        >
          지난 모집공고 {showLast ? "닫기" : "확인하기"}
        </button>

        {showLast ? (
          <div className="flex flex-col justify-center items-center overflow-hidden border-2 p-3 rounded-lg ">
            {loading && (
              <svg
                class="animate-pulse h-5 w-5 rounded-full bg-green-950"
                viewBox="0 0 24 24"
              ></svg>
            )}
            <img
              className={`fade_in w-1/2  ${loading ? "hidden" : ""} ${
                isZoomed ? "w-full cursor-zoom-out" : "w-1/2 cursor-zoom-in"
              }`}
              onClick={() => {
                setIsZoomed((prev) => !prev);
              }}
              src={primitive23}
              alt="23년도 모집공고"
              onLoad={() => {
                setLoading(false);
              }}
            ></img>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default RecruitPage;
