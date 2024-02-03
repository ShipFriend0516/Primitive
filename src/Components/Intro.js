import styled from "styled-components";
import logoBanner from "../Images/프미배너.jpg";
import project1 from "../Images/cover4.jpg";
import project2 from "../Images/Title-Invisible.png";
import project3 from "../Images/2.jpg";

import Introduction1 from "../Images/1.png";
import Introduction2 from "../Images/2.png";
import Introduction3 from "../Images/3.png";
import Introduction4 from "../Images/4.png";

import ProjectCard from "./ProjectCard";

const Intro = () => {
  const Cover = styled.div`
    width: 100vw;
    position: relative;
    padding: 5rem;
    padding-top: 100px;
    padding-bottom: 100px;
    max-width: 80rem;
    margin: 0 auto;
    > div {
    }

    > div:first-child {
      left: 2.5rem;
    }

    > div:last-child {
      right: 2.5rem;
    }

    @media (max-width: 768px) {
      padding: 3rem;
    }
  `;

  const ActivityCard = styled.div`
    padding: 20px;
    box-shadow: 0 0 3px gray;
    border-radius: 20px;
    min-height: 30%;
    position: relative;
    aspect-ratio: 16/9;
    background-color: white;
    font-weight: bold;

    h4 {
      font-size: 1.8rem;
      position: relative;
      color: white;
      text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
      padding-left: 0.1em;

      border-radius: 5px;
    }

    p {
      font-size: 1.2rem;
      position: relative;
      text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
      color: white;
      padding-left: 0.1em;
    }

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 20px;
    }
    background-image: ${(props) => `url(${props.backgroundImage})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  `;

  return (
    <div className="bg-black w-screen min-h-screen">
      {/* <img src={logoBanner} alt="logoBanner" /> */}
      <section className="bg-gradient-to-b from-black to-indigo-950 bg-black text-white h-screen flex flex-col justify-center items-center">
        <div className="top-1/4 fade_in mb-10">
          <h1 className="text-center primitive">PRIMITIVE</h1>
          <h2 className="btn-shine text-center">
            <span className=" text-blue-500">0</span>과 <span className="text-red-600">1</span> 사이
            무한한 가능성, KNU 프로그래밍 동아리
          </h2>
        </div>
      </section>
      {/* <section className="bg-white w-screen">
    <div className="bg-black w-screen min-h-screen">
      {/* <img src={logoBanner} alt="logoBanner" /> */}
      <section className="bg-gradient-to-b from-black to-indigo-950 bg-black text-white h-screen flex flex-col justify-center items-center">
        <div className="top-1/4 fade_in mb-10">
          <h1 className="text-center primitive">PRIMITIVE</h1>
          <h2 className="btn-shine text-center">
            <span className=" text-blue-500">0</span>과 <span className="text-red-600">1</span> 사이
            무한한 가능성, KNU 프로그래밍 동아리
          </h2>
        </div>
      </section>
      {/* <section className="bg-white w-screen">
        <div class="shuffleBox">
          <p>Hello 👋 We're</p>
          <div class="shuffleAnimation">
            <div class="first">
              <div>개발 동아리</div>
            </div>
            <div class="second">
              <div>창업 동아리</div>
            </div>
            <div class="third">
              <div></div>
            </div>
          </div>
        </div>
      </section> */}
      <section className="bg-slate-50">
        <Cover className="bg-slate-50 md:p-20 p-10">
          <div className="top-1/4 mb-10">
            <p className="2xl:text-6xl xl:text-6xl lg:text-4xl md:text-3xl sm:text-3xl text-3xl font-bold">
              무슨 활동을 하나요?
            </p>
            <p className="text-xl">
              정규 활동으로는 신입생 교육과 창업동아리가 있고, 자율적으로 스터디·공모전·프로젝트를
              진행합니다.
            </p>
          </div>
          <div className="max-w-7xl mx-auto w-full h-1/2 grid md:grid-cols-2 md:grid-rows-2 grid-cols-1 gap-5">
            <ActivityCard backgroundImage={Introduction4}>
              <h4>신입생 교육</h4>
              <p>신입생을 위한 코딩 교육을 진행해요!</p>
            </ActivityCard>
            <ActivityCard backgroundImage={Introduction3}>
              <h4>홈커밍데이</h4>
              <p>졸업생 선배님들의 이야기와 지식을 공유해요!</p>
            </ActivityCard>
            <ActivityCard backgroundImage={Introduction1}>
              <h4>팀 프로젝트 진행</h4>
              <p>팀을 이루어 스터디·공모전·창업동아리를 진행해요!</p>
            </ActivityCard>
            <ActivityCard backgroundImage={Introduction2}>
              <h4>네트워킹</h4>
              <p>회식과 MT 등 동아리 부원과 함께 즐거운 추억을 만들어요!</p>
            </ActivityCard>
          </div>
        </Cover>
      </section>
      <section className="bg-slate-100">
        <Cover className="bg-slate-100">
          <div className="top-1/4 right-10 fade_in">
            <p className="2xl:text-6xl xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl text-3xl font-bold">
              대표 프로젝트
            </p>
            <p className="text-xl">Primitive의 대표 프로젝트에는 이런 것들이 있어요</p>
          </div>
          <div className="w-full h-2/4 grid grid-cols-1 grid-rows-1 md:grid-cols-3 gap-5 ">
            <ProjectCard
              projectThumbnail={project1}
              projectName={"EcoChoice"}
              projectDate={"23/09 ~ 23/12"}
              projectDescription={"친환경 이커머스 서비스"}
              // projectParticipate={["서정우", "윤가은"]}
              projectTechStacks={["Web", "React", "Redux"]}
            />
            <ProjectCard
              projectThumbnail={project2}
              projectName={"솜뭉치"}
              projectDate={"24/01 ~ "}
              projectDescription={"장애인생산품 판매 중개 플랫폼"}
              // projectParticipate={["이진성", "김유진", "이나경"]}
              projectTechStacks={["App", "Flutter", "Spring"]}
            />
            <ProjectCard
              projectThumbnail={project3}
              projectName={"뜨개랑"}
              projectDate={"24/01 ~ "}
              projectDescription={"뜨개용품 판매 특화 커뮤니티 서비스"}
              // projectParticipate={["이찬규", "홍현지", "박시현"]}
              projectTechStacks={["Web", "React", "Spring"]}
            />
          </div>
        </Cover>
      </section>
    </div>
  );
};

export default Intro;
