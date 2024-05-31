import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import ProjectCard from "../Components/ProjectCard";

import { IoIosAdd } from "react-icons/io";
import Footer from "../Components/Footer";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { ProjectDetail } from "../Types/ProjectType";
import useStore from "../store";

const ProjectPage = () => {
  // 상태 관리
  const [projects, setProjects] = useState<ProjectDetail[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  // 전역상태
  const { isLoggedIn } = useStore();
  // Effect
  useEffect(() => {
    try {
      if (isLoggedIn) {
        getPrivateProjects();
      } else {
        getProjects();
      }
    } catch (error) {
      console.error("프로젝트 목록 불러오기 실패!", error);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    console.count();
  }, [projects]);

  // 메서드
  const getProjects = async () => {
    try {
      // 비로그인 유저는 공개글만
      const response = await getDocs(
        query(
          collection(db, "projects"),
          where("isPrivate", "!=", true),
          orderBy("createdAt", "desc")
        )
      );
      setProjects(
        response.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<ProjectDetail, "id">),
        }))
      );
      setProjectsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getPrivateProjects = async () => {
    try {
      // 로그인 유저
      const response = await getDocs(
        query(collection(db, "projects"), orderBy("createdAt", "desc"))
      );
      setProjects(
        response.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<ProjectDetail, "id">),
        }))
      );

      setProjectsLoading(false);
    } catch (error) {
      console.error("비공개 글 불러오기 실패");
    }
  };

  const renderProjects = () => {
    return projects.map((project, index) => (
      <ProjectCard
        key={project.id}
        projectThumbnail={project.thumbnail!}
        projectId={project.id}
        projectName={project.name!}
        projectDescription={project.intro!}
        projectTechStacks={project.techStack!}
        projectParticipate={project.participants}
        isPrivate={project.isPrivate}
      />
    ));
  };

  const preRender = () => {
    return Array(8)
      .fill(0)
      .map((project, index) => (
        <ProjectCard
          isEmpty={true}
          key={index}
          projectThumbnail={project.thumbnail!}
          projectId={project.id}
          projectName={project.name!}
          projectDescription={project.intro!}
          projectTechStacks={project.techStack!}
          projectParticipate={project.participants}
        />
      ));
  };
  return (
    <section className="flex flex-col  min-h-screen justify-between">
      <NavBar />
      <>
        <div className="max-w-7xl mx-auto min-h-fit w-full flex-grow flex flex-col items-center relative pb-20">
          <h1 className="text-5xl mt-24 font-bold">프로젝트</h1>
          <p className="mb-5">프리미티브의 활동들을 모아보세요!</p>
          <Link
            to={"/project/edit"}
            className="projectAddBtn absolute top-24 bg-white right-12 border hover:shadow-lg rounded-full w-12 h-12 flex justify-center items-center text-3xl cursor-pointer hover:bg-indigo-950 hover:text-white"
          >
            <IoIosAdd />
          </Link>
          <div
            id="filterGroup"
            className="w-full justify-center relative flex flex-wrap max-w-full gap-1 mb-5"
          >
            <div className="rounded-3xl text-white flex justify-center items-center hover:bg-gray-700 cursor-pointer bg-black w-16 h-12 ">
              전체
            </div>
            <div className="rounded-3xl text-white flex justify-center items-center hover:bg-gray-700 cursor-pointer bg-black w-16 h-12 ">
              App
            </div>
            <div className="rounded-3xl text-white flex justify-center items-center hover:bg-gray-700 cursor-pointer bg-black w-16 h-12 ">
              Web
            </div>
          </div>
          <div
            id="projectGrid"
            className="w-4/5 mx-20 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3"
          >
            {projectsLoading ? preRender() : renderProjects()}
          </div>
        </div>
      </>
      <Footer />
    </section>
  );
};

export default ProjectPage;
