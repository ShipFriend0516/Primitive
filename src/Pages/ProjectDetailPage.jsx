import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";

import Footer from "../Components/Footer";
import { useParams } from "react-router-dom";

import thumbnailEx from "../Images/에코초이스.webp";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import DOMPurify from "dompurify";

const ProjectDetailPage = () => {
  const { id } = useParams();

  // Effect
  useEffect(() => {
    console.log(id);
    // 여기에서 projectId를 이용해 API로부터 데이터를 가져오는 로직을 작성하시면 됩니다.
    getProjectDetail();
  }, [id]);

  // 상태관리
  const [project, setProject] = useState();
  const [projectLoading, setProjectLoading] = useState(true);

  // Method
  const getProjectDetail = async () => {
    try {
      const projectRef = doc(db, "projects", id);
      const response = await getDoc(projectRef);
      console.log(response.data());
      setProject({ id: response.id, ...response.data() });
      setProjectLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  // 가정: API로부터 가져온 프로젝트 세부 정보
  const projectEx = {
    thumbnail: thumbnailEx,
    intro: "이건 로딩 전에 뜨는 화면입니다.",
    title: "아직 지원하지 않는 기능이에요!",
    description: "프로젝트의 세부 내용을 확인할 수 있을 예정이에요.",
    date: "23/9 ~ 23/12",
    techStacks: ["React", "Spring Boot", "AWS", "MySQL"],
    participants: ["누군가", "이걸보다니.."],
    // 추가적이거나 특정한 정보를 더 표시하고 싶다면 여기에 추가하세요.
  };

  function formatTimeDifference(uploadedTime) {
    const now = new Date();
    const uploadedDate = new Date(uploadedTime);

    const diffInMs = now - uploadedDate;
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMs / 3600000);
    const diffInDays = Math.floor(diffInMs / 86400000);

    if (diffInMinutes < 1) {
      return "방금 전";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`;
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else {
      const year = uploadedDate.getFullYear();
      const month = String(uploadedDate.getMonth() + 1).padStart(2, "0");
      const day = String(uploadedDate.getDate()).padStart(2, "0");
      return `${year}년 ${month}월 ${day}일`;
    }
  }

  const preRender = () => {
    return (
      <div className="mt-10 md:mt-20 max-w-6xl mx-auto w-full flex-grow flex flex-col items-stretch p-5 md:p-10 gap-2">
        <div className="aspect-project gothic gap-10 flex justify-center items-center text-white w-full object-cover mb-8  bg-gradient-to-br rounded-md bg-gray-200 animate-pulse text-7xl">
          <span className="text-indigo-950 animate-bounce delay-1">.</span>
          <span className="text-indigo-950 animate-bounce delay-2">.</span>
          <span className="text-indigo-950 animate-bounce delay-3">.</span>
        </div>
        <h1 className="w-2/3 h-8 mx-auto text-3xl text-center md:text-5xl font-bold mb-4 rounded-md bg-gray-200 animate-pulse text-transparent">
          {"프로젝트 설명"}
        </h1>
        <p className="w-1/3 mx-auto text-lg mb-4 text-center rounded-md bg-gray-200 animate-pulse text-gray-200">
          {projectEx.intro}
        </p>
        <p className="ml-auto w-1/4 h-4 text-right  mb-4 rounded-md bg-gray-200 animate-pulse text-transparent">
          프로젝트가 작성된 날짜
        </p>
        <div className="w-full inline-flex items-center gap-2 ">
          <h3 className="px-2 rounded-md bg-gray-200 animate-pulse text-gray-200">
            프로젝트 참여자
          </h3>

          {projectEx.participants.map((participant, index) => (
            <span
              key={index}
              className={` px-2  rounded-md bg-gray-200 animate-pulse text-gray-200 gap-2  text-nowrap`}
            >
              {participant}
            </span>
          ))}
        </div>
        <div className="w-full inline-flex items-center gap-2">
          <h3 className="w-fit  px-2  rounded-md bg-gray-200 animate-pulse text-gray-200 ">
            사용한 기술스택
          </h3>
          {projectEx.techStacks.map((tech, index) => (
            <span
              key={index}
              className={`px-2 rounded-md bg-gray-200 animate-pulse text-gray-200 gap-2  text-nowrap`}
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="w-full mt-3 flex flex-col gap-2">
          <div className="w-full h-4 rounded-md bg-gray-200 animate-pulse text-gray-200 projectDescription flex flex-col items-start"></div>
          <div className="w-1/4 h-4  rounded-md bg-gray-200 animate-pulse text-gray-200 projectDescription flex flex-col items-start"></div>
          <div className="w-3/4 h-4 rounded-md bg-gray-200 animate-pulse text-gray-200 projectDescription flex flex-col items-start"></div>
          <div className="w-full h-4 rounded-md bg-gray-200 animate-pulse text-gray-200 projectDescription flex flex-col items-start"></div>
          <div className="w-3/5 h-4 rounded-md bg-gray-200 animate-pulse text-gray-200 projectDescription flex flex-col items-start"></div>
        </div>
      </div>
    );
  };

  const projectRender = () => {
    return (
      <div className="mt-10 md:mt-20 max-w-6xl mx-auto w-full flex-grow flex flex-col items-stretch p-5 md:p-10 gap-2">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full aspect-project object-cover mb-4 md:mb-6 rounded"
          />
        ) : (
          <div className="gothic gap-10 flex justify-center items-center text-white w-full h-96 object-cover mb-4 rounded bg-gradient-to-br from-indigo-950 to-black text-8xl ">
            <span className="animate-bounce delay-1">.</span>
            <span className="animate-bounce delay-2">.</span>
            <span className="animate-bounce delay-3">.</span>
          </div>
        )}
        <h1 className="text-4xl text-center md:text-5xl font-bold">{project.name}</h1>
        <p className=" md:text-xl mb-2 text-center">{project.intro}</p>
        <p className="text-right w-full mb-2 text-sm">{formatTimeDifference(project.createdAt)}</p>
        <div className="w-full inline-flex flex-wrap items-center gap-2 mt-2 text-xs md:text-sm">
          <h3 className="px-2 py-1 bg-indigo-800 text-white rounded-md">프로젝트 참여자</h3>
          {project.participants.map((participant, index) => (
            <span
              key={index}
              className={`px-2 py-1 bg-indigo-100 rounded-md gap-2 tagAnimation text-nowrap
                ${index % 2 === 0 && "bg-indigo-50"}
                ${index % 2 === 1 && "bg-indigo-100"}
                hover:bg-indigo-200
                `}
            >
              {participant}
            </span>
          ))}
        </div>
        <div className="w-full inline-flex flex-wrap items-center gap-2 text-xs md:text-sm">
          <h3 className="w-fit px-2 py-1 bg-emerald-900 text-white rounded-md ">사용한 기술스택</h3>
          {project.techStack.map((tech, index) => (
            <span
              key={index}
              className={`px-2 py-1 bg-emerald-100 rounded-md gap-2 tagAnimation text-nowrap
                ${index % 2 === 0 && "bg-emerald-50"}
                ${index % 2 === 1 && "bg-emerald-100"}
                hover:bg-emerald-200
                `}
            >
              {tech}
            </span>
          ))}
        </div>
        <article
          className="mt-6 projectDescription flex flex-col items-start"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.description) }}
        ></article>
      </div>
    );
  };

  return (
    <section className="flex flex-col min-h-screen  justify-between bg-white text-black">
      <NavBar />
      {projectLoading ? preRender() : projectRender()}
      <Footer />
    </section>
  );
};

export default ProjectDetailPage;
