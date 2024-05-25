import NavBar from "../Components/NavBar";
import MemberCard from "../Components/MemberCard";
import Footer from "../Components/Footer";
import jeongwoo from "../Images/jeongwoo.webp";
import gaeun from "../Images/gaeun.webp";
import jinseong from "../Images/jinseong.webp";

const MembersPage = () => {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <NavBar />
      <>
        <div className="max-w-7xl mx-auto w-screen pb-24 flex flex-col items-center ">
          <h1 className="md:text-5xl text-3xl font-bold mt-24 mb-10">운영진</h1>
          <div className="flex  gap-4 md:flex-row flex-col mb-24">
            <MemberCard
              name={"곽민정"}
              number={22}
              position={"회장"}
              description={"안녕하세요 PRIMITIVE 22대 회장 곽민정입니다."}
            />
            <MemberCard
              name={"이찬규"}
              number={20}
              position={"부회장"}
              description={"안녕하세요 PRIMITIVE 부회장 20학번 이찬규입니다!"}
            />
          </div>
          <h2 className="text-3xl font-bold my-3  ">제작</h2>
          <div className="flex md:flex-row  flex-col gap-2">
            <MemberCard
              image={jeongwoo}
              name={"서정우"}
              number={21}
              position={"프론트엔드"}
              description={"React | Firebase"}
              type={"small"}
            />
            <MemberCard
              image={jinseong}
              name={"이진성"}
              number={20}
              position={"백엔드"}
              description={"React"}
              type={"small"}
            />
            <MemberCard
              image={gaeun}
              name={"윤가은"}
              number={21}
              position={"Special Thanks"}
              description={"Design 훈수"}
              type={"small"}
            />
          </div>
        </div>
      </>
      <Footer />
    </div>
  );
};

export default MembersPage;
