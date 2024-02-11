import { useEffect } from "react";
import NavBar from "../Components/NavBar";

import Footer from "../Components/Footer";
import { useParams } from "react-router-dom";

import thumbnailEx from "../Images/에코초이스.webp";
import { animated, useSprings, config } from "react-spring";

const ProjectDetailPage = () => {
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    // 여기에서 projectId를 이용해 API로부터 데이터를 가져오는 로직을 작성하시면 됩니다.
  }, [id]);

  const items = [0, 1, 2];
  const springs = useSprings(
    items.length,
    items.map((item, i) => ({
      opacity: 1,
      from: { opacity: 0 },
      delay: i * 200,
      config: config.molasses,
      reset: true,
      reverse: true,
    }))
  );

  // 가정: API로부터 가져온 프로젝트 세부 정보
  const project = {
    thumbnail: thumbnailEx,
    title: "아직 지원하지 않는 기능이에요!",
    description: "프로젝트의 세부 내용을 확인할 수 있을 예정이에요.",
    date: "23/9 ~ 23/12",
    techStacks: ["React", "Redux", "Spring Boot", "AWS", "MySQL"],
    participants: [""],
    // 추가적이거나 특정한 정보를 더 표시하고 싶다면 여기에 추가하세요.
  };

  return (
    <section className="flex flex-col min-h-screen max-w-7xl justify-between bg-white text-black">
      <NavBar />
      <div className="w-screen flex-grow flex flex-col items-center p-20">
        {/* <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-96 object-cover mb-8 rounded"
        /> */}
        <div className="gothic gap-10 flex justify-center items-center text-white w-full h-96 object-cover mb-8 rounded bg-gradient-to-br from-indigo-950 to-black text-8xl ">
          <span className="animate-bounce delay-1">.</span>
          <span className="animate-bounce delay-2">.</span>
          <span className="animate-bounce delay-3">.</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{project.title}</h1>
        <p className="text-lg mb-4">{project.description}</p>
        <p className="text-right w-full mb-4">{project.date}</p>
        <div className="w-full">
          <h3 className="text-xl font-bold mb-2">기술 스택:</h3>
          <ul className="list-disc list-inside">
            {project.techStacks.map((tech, index) => (
              <span key={index} className="tag px-2 py-2 list-none">
                {tech}
              </span>
            ))}
          </ul>
        </div>
        <div className="w-full mt-4">
          <h3 className="text-xl font-bold mb-2">참여자:</h3>
          <ul className="list-disc list-inside">
            {project.participants.map((participant, index) => (
              <li key={index} className="mb-1">
                {participant}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default ProjectDetailPage;
