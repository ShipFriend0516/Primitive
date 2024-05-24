import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import ProjectCard from "../Components/ProjectCard";
import styled from "styled-components";

import project1 from "../Images/에코초이스.webp";
import project2 from "../Images/솜뭉치.webp";
import project3 from "../Images/뜨개랑.webp";
import project4 from "../Images/인프라운드.webp";
import project5 from "../Images/primitive.webp";

import Footer from "../Components/Footer";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const ProjectPage = () => {
  const Filter = styled.span`
    border-radius: 32px;
    cursor: pointer;

    background-color: #2a2d32;
    height: 54px !important;
    padding-left: import { getDocs } from 'firebase/firestore';
24px;import { query } from 'firebase/firestore';

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

  // 상태 관리
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  // Effect
  useEffect(() => {
    getProjects();
  }, []);

  // 메서드

  const getProjects = async () => {
    try {
      const response = await getDocs(query(collection(db, "projects")));
      setProjects(
        response.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
      setProjectsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex flex-col  min-h-screen justify-between">
      <NavBar />
      <>
        <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col items-center">
          <h1 className="text-5xl mt-24 font-bold">프로젝트</h1>
          <p className="mb-5">프리미티브의 활동들을 모아보세요!</p>
          <div id="filterGroup" className="flex flex-wrap max-w-full gap-1 mb-5">
            <div className="rounded-3xl text-white flex justify-center items-center hover:bg-gray-700 cursor-pointer bg-black w-16 h-12 ">
              전체
            </div>
            <div className="rounded-3xl text-white flex justify-center items-center hover:bg-gray-700 cursor-pointer bg-black w-16 h-12 ">
              App
            </div>
            <div className="rounded-3xl text-white flex justify-center items-center hover:bg-gray-700 cursor-pointer bg-black w-16 h-12 ">
              Web
            </div>
            {/* <Filter></Filter> */}
          </div>
          <div
            id="projectGrid"
            className="w-4/5 mx-20 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3"
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                projectThumbnail={project.thumbnail}
                projectId={project.id}
                projectName={project.name}
                projectDescription={project.intro}
                projectTechStacks={project.techStack}
                projectParticipate={project.participants}
              />
            ))}
            <ProjectCard
              projectThumbnail={project1}
              projectName={"에코초이스"}
              projectDate={"23/09 ~ 23/12"}
              projectDescription={"친환경 이커머스 서비스"}
              // projectParticipate={["서정우", "윤가은"]}
              projectTechStacks={["Web", "React", "Spring", "MySQL", "AWS"]}
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
            <ProjectCard
              projectThumbnail={project4}
              projectName={"인프라운드"}
              projectDate={"23/03 ~ 23/12"}
              projectDescription={"내 주변 인프라를 점수로! 인프라운드"}
              // projectParticipate={["서정우", "윤가은"]}
              projectTechStacks={["Web", "React"]}
            />
            <ProjectCard
              projectThumbnail={project5}
              projectName={"프리미티브"}
              projectDate={"24/01 ~ "}
              projectDescription={"공주대학교 IT동아리 프리미티브 홍보 웹사이트"}
              // projectParticipate={["서정우", "윤가은", "이진성"]}
              projectTechStacks={["Web", "React", "Spring"]}
            />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
          </div>
        </div>
      </>
      <Footer />
    </section>
  );
};

export default ProjectPage;
