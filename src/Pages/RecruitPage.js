import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import PrimitiveRecruit24 from "../Images/24PrimitiveRecruit.webp";
import Footer from "../Components/Footer";

const RecruitPage = () => {
  const [showLast, setShowLast] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDate, setIsDate] = useState(false);

  useEffect(() => {
    const now = new Date();
    const start = new Date(2024, 1, 13);
    const end = new Date(2024, 2, 11);

    setIsDate(now >= start && now <= end);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow bg-slate-50 w-screen flex flex-col items-center justify-center py-20 gap-1">
        {isDate ? (
          <h3 className="md:text-4xl text-3xl text-center">많은 지원 부탁드립니다!</h3>
        ) : (
          <h3 className="md:text-4xl text-3xl text-center">지금은 지원기간이 아닙니다!</h3>
        )}
        <p>2024년 모집 기간: 2월 13일 (화) ~ 3월 11일 (월)</p>
        <a href="/24/2024학년도 PRIMITIVE 신청서.hwp" download>
          <button className="bg-white shadow-xl py-2 px-6 rounded-lg mt-3 mb-3 hover:shadow-lg hover:shadow-indigo-200 w-72">
            👉 모집 신청서 양식 다운로드
          </button>
        </a>
        <a href="/24/2024 PRIMITIVE 신입생 OT 자료.pdf" download>
          <button className="bg-white shadow-xl py-2 px-6 rounded-lg mb-3 hover:shadow-lg hover:shadow-indigo-200  w-72">
            👉 신입생 OT 자료 다운로드
          </button>
        </a>
        <a href="https://hyeonji0401.github.io/JoinPrimitive/" target="_blank" rel="noreferrer">
          <button className="bg-yellow-100 py-2 px-6 rounded-lg mb-3 shadow-xl hover:bg-yellow-200 w-72 ">
            <div>🤔 내가 PRIMITIVE에 들어간다면?</div>
            <div>💡 심리테스트 해보기</div>
          </button>
        </a>
        <button
          className="bg-green-200 py-2 px-6 rounded-lg mb-3 shadow-xl hover:bg-green-300  w-72"
          onClick={() => setShowLast((prev) => !prev)}
        >
          👀 이번 모집공고 {showLast ? "닫기" : "확인하기"}
        </button>
        {showLast ? (
          <div className="flex flex-col justify-center items-center overflow-hidden border-2 p-3 rounded-lg ">
            {loading && (
              <svg
                className="animate-pulse h-5 w-5 rounded-full bg-green-950"
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
              src={PrimitiveRecruit24}
              alt="23년도 모집공고"
              onLoad={() => {
                setLoading(false);
              }}
            ></img>
          </div>
        ) : (
          ""
        )}
        <div className="flex flex-col items-center mt-20">
          <p className="text-xl bg-black text-white px-16 py-1 rounded-tr-lg rounded-tl-lg">
            신청서 제출 방법
          </p>
          <div className="flex sm:flex-row flex-col text-white rounded-lg overflow-hidden text-nowrap">
            <div className="flex flex-col bg-slate-800 p-5 flex-1">
              <span>회장</span>
              <span className="text-2xl font-bold">곽민정</span>
              <p>Kakao ID: 2002kwak</p>
              <p>Email: kwak2002mj@gmail.com</p>
            </div>
            <div className="flex flex-col bg-slate-800 p-5 flex-1">
              <span>부회장</span>
              <span className="text-2xl font-bold">이찬규</span>
              <p>Kakao ID: LCGPull</p>
              <p>Email: lay5137@naver.com</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RecruitPage;
