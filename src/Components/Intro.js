import styled from "styled-components";
import logoBanner from "../Images/프미배너.jpg";
import project1 from "../Images/cover4.jpg";
import project2 from "../Images/Title-Invisible.png";
import project3 from "../Images/2.jpg"

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
    > div {
    }

    > div:first-child {
      left: 2.5rem;
    }

    > div:last-child {
      right: 2.5rem;
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
    
    
    h4 {
      font-size: 1.5rem;
      position: relative;
      color : white;
    }
   
    p {
      position: relative;
      color : white;
    }
    
    &:before{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0, 0.2);
      border-radius: 20px;
      
    }
    background-image: ${(props) => `url(${props.backgroundImage})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  `;

  return (
    <div className="bg-white w-screen min-h-screen pt-14">
      {/* <img src={logoBanner} alt="logoBanner" /> */}
      <Cover className="bg-gradient-to-br from-violet-300 to-white ">
        <div className=" top-1/4 fade_in mb-10">
          <p className="2xl:text-6xl xl:text-6xl lg:text-6xl md:text-5xl sm:text-4xl text-2xl">
            PRIMITIVE
          </p>
          <p className="sm:text-3xl text-xl">공주대학교 IT 창업동아리</p>
        </div>
        <div className="top-3/4 fade_in md:text-xl">
          <p>
            Primitive는 2002년도에 임재현 교수님의 지도 아래 모바일 컴퓨팅 기술을 개발하고 경진대회에도 참가하면서 시작했어요.
          </p>
          <br/>
          <p>
            우리 동아리는 프로그래밍을 통해 앱이나 웹사이트처럼 실제로 사용할 수 있는 멋진
            결과물들을 만들어 내고 있습니다. 함께 프로그래밍의 재미를 느껴보고 싶다면, Primitive와 함께 하세요!
          </p>
        </div>
      </Cover>

      <Cover className="bg-slate-50 p-20">
        <div className="top-1/4 mb-10">
          <p className="2xl:text-6xl xl:text-6xl lg:text-4xl md:text-3xl sm:text-3xl text-2xl">
            무슨 활동을 하나요?
          </p>
          <p className="text-xl">
            정규 활동으로는 신입생 교육과 창업동아리가 있고, 비정규 시간에는 자율적으로
            스터디·공모전·프로젝트를 진행합니다.
          </p>
        </div>
        <div className="w-full h-1/2 grid grid-cols-2 grid-rows-2  md:px-10 px-20 gap-5">
          <ActivityCard backgroundImage={Introduction4}>
            <h4>신입생 교육</h4>
            <p>신입생을 위한 코딩 교육을 진행합니다!</p>
          </ActivityCard>
          <ActivityCard backgroundImage={Introduction3}>
            <h4>홈커밍데이, 졸업생 멘토링</h4>
            <p>졸업생 선배님들의 이야기와 지식을 공유합니다!</p>
          </ActivityCard>
          <ActivityCard backgroundImage={Introduction1}>
            <h4>팀 프로젝트 진행</h4>
            <p>팀을 이루어 스터디·공모전·창업동아리를 진행합니다!</p>
          </ActivityCard>
          <ActivityCard backgroundImage={Introduction2}>
            <h4>네트워킹</h4>
            <p>회식과 MT 등 동아리 부원과 함께 즐거운 추억을 쌓는 Primitive!</p>
          </ActivityCard>
        </div>
      </Cover>
      <Cover className="bg-slate-100">
        <div className="top-1/4 right-10 fade_in">
          <p className="2xl:text-6xl xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl text-2xl">
            대표 프로젝트
          </p>
        </div>
        <div className="w-full h-2/4 grid grid-cols-3 grid-rows-1 gap-5 ">
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
    </div>
  );
};

export default Intro;
