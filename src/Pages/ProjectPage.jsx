import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import ProjectCard from "../Components/ProjectCard";
import styled from "styled-components";

import project1 from "../Images/에코초이스.webp";
import project2 from "../Images/솜뭉치.webp";
import project3 from "../Images/뜨개랑.webp";
import project4 from "../Images/인프라운드.webp";
import project5 from "../Images/primitive.webp";
import { IoIosAdd } from "react-icons/io";
import Footer from "../Components/Footer";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const ProjectPage = () => {
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
        <div className="max-w-7xl mx-auto min-h-fit w-full flex-grow flex flex-col items-center relative ">
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
          </div>
          <Link
            to={"/project/edit"}
            className="projectAddBtn absolute bg-white bottom-10 right-10 border shadow-xl hover:shadow-lg rounded-full w-12 h-12 flex justify-center items-center text-3xl cursor-pointer hover:bg-indigo-950 hover:text-white"
          >
            <IoIosAdd />
          </Link>
        </div>
      </>
      <Footer />
    </section>
  );
};

export default ProjectPage;
