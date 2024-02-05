import { useEffect } from "react";
import NavBar from "../Components/NavBar";
import ProjectCard from "../Components/ProjectCard";
import styled from "styled-components";

import project1 from "../Images/에코초이스.webp";
import project2 from "../Images/솜뭉치.webp";
import project3 from "../Images/뜨개랑.webp";

import Footer from "../Components/Footer";

const ProjectPage = () => {
  const Filter = styled.span`
    border-radius: 32px;
    cursor: pointer;

    background-color: #2a2d32;
    height: 54px !important;
    padding-left: 24px;
    padding-right: 24px;
    color: white;
    line-height: 54px;

    &:hover {
      background-color: #555555;
    }

    &:focus {
      outline: 3px solid #9ba1df;
    }
  `;

  return (
    <div className="flex flex-col justify-between w-screen min-h-screen">
        <NavBar />

        <div className="py-64 flex flex-col justify-center items-center gap-5">
            <div className="text-3xl flex items-center">
                <h1 className="text-5xl">아직 개발 중이에요...!</h1>
                <span className="text-4xl">
                    <img
                    src={"https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1603672003/noticon/s3sridqyw5xalrxrnreu.png"}></img>
                </span>
            </div>
        </div>
        <Footer />
    </div>
    /*<>
      <NavBar />
      <>
        <div className="w-screen h-screen flex flex-col items-center">
          <h1 className="text-5xl mt-24 font-bold">프로젝트</h1>
          <p className="mb-5">프리미티브의 활동들을 모아보세요!</p>
          <div id="filterGroup" className="flex flex-wrap max-w-full gap-1 mb-5">
            <Filter>전체</Filter>
            <Filter>Mobile</Filter>
            <Filter>Web</Filter>
            <Filter>?</Filter>
          </div>
          <div
            id="projectGrid"
            className="w-4/5 mx-20 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3"
          >
            <ProjectCard
              projectThumbnail={project1}
              projectName={"EcoChoice"}
              projectDate={"23/09 ~ 23/12"}
              projectDescription={"친환경 이커머스 서비스"}
              // projectParticipate={["서정우", "윤가은"]}
              projectTechStacks={["Web", "React", "Redux"]}
            />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
          </div>
        </div>
      </>
    </>*/
  );
};

export default ProjectPage;
