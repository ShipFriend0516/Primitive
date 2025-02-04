import { Link } from "react-router-dom";
import { HiPencilSquare } from "react-icons/hi2";

const ProjectHeader = () => {
  return (
    <>
      <h1 className="inline-flex text-5xl mt-24 font-bold relative">
        프로젝트
        <Link
          to={"/project/edit"}
          className="projectAddBtn absolute bg-white -right-14 border rounded-full w-12 h-12 flex justify-center items-center text-3xl cursor-pointer hover:bg-indigo-950 hover:text-white"
        >
          <HiPencilSquare />
        </Link>
      </h1>
      <p className="text-lg mt-2 mb-5">프리미티브의 활동들을 모아보세요!</p>
    </>
  );
};

export default ProjectHeader;
