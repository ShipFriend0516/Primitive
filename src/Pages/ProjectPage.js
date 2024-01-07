import { useEffect } from "react";
import NavBar from "../Components/NavBar";
import ProjectCard from "../Components/ProjectCard";
import styled from "styled-components";

const ProjectPage = () => {
  const Filter = styled.span`
    border-radius: 32px;
    cursor: pointer;

    background-color: #2a2d32 !important;
    height: 54px !important;
    padding-left: 24px;
    padding-right: 24px;
    color: white;
    line-height: 54px;
  `;

  return (
    <>
      <NavBar />
      <>
        <div className="w-screen h-screen flex flex-col items-center">
          <h1 className="text-5xl mt-24">프로젝트</h1>
          <p className="mb-2">프리미티브의 활동들을 모아보세요!</p>
          <div id="filterGroup" className="flex flex-wrap max-w-full gap-1 mb-3">
            <Filter>전체</Filter>
            <Filter>Mobile</Filter>
            <Filter>Web</Filter>
            <Filter>?</Filter>
          </div>
          <div
            id="projectGrid"
            className="w-4/5 mx-20 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 bg-slate-50 gap-3"
          >
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
          </div>
        </div>
      </>
    </>
  );
};

export default ProjectPage;
