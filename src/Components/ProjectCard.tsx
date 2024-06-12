import { useNavigate } from "react-router-dom";
import ProjectType from "../Types/ProjectType.d";
import { HiLockClosed } from "react-icons/hi";

const ProjectCard = ({
  isEmpty = true,
  projectId,
  projectThumbnail,
  projectName,
  projectDate,
  projectDescription,
  projectParticipate = [],
  projectTechStacks = [],
  isPrivate,
}: ProjectType) => {
  if (projectThumbnail) {
    isEmpty = false;
  }

  const navigate = useNavigate();

  const onClickProject = () => {
    navigate(`/project/${projectId}`);
  };

  const preRender = () => {
    return (
      <div className=" p-2 w-full h-full mb-5 animate-pulse">
        <div
          className={`w-full rounded-md aspect-video overflow-hidden  ${
            isEmpty ? "bg-emerald-100" : ""
          }`}
        >
          <div className="cursor-pointer aspect-video bg-gray-200"></div>
        </div>
        <div className="w-full h-1/2 px-0 py-2">
          <p className="text-indigo-400 text-sm hidden">{"projectDate"}</p>
          <p
            className="cursor-pointer font-semibold text-black text-xl bg-gray-200 rounded-md w-2/3 h-5 text-transparent"
            onClick={onClickProject}
          >
            {"projectName"}
          </p>
          <p className="mt-1 h-3 text-sm bg-gray-200 rounded-md w-3/4 text-transparent">
            {"projectDescription.slice(0, 30)"}
          </p>
          {/* <p className="text-sm">
            {projectParticipate.map((m) => {
              return <span className="mb-1 tag px-1.5">{m}</span>;
            })}
          </p> */}
          <span className="mt-1 text-sm inline-flex flex-wrap gap-1">
            <span className="mb-1 px-1.5 bg-gray-200 rounded-md  h-5 text-transparent" key={1}>
              {"tag"}
            </span>
            <span className="mb-1 px-1.5 bg-gray-200 rounded-md  h-5 text-transparent" key={2}>
              {"tag"}
            </span>
            <span className="mb-1 px-1.5 bg-gray-200 rounded-md  h-5 text-transparent" key={3}>
              {"tag"}
            </span>
          </span>
        </div>
      </div>
    );
  };

  const cardRender = () => {
    return (
      <div className="p-2 w-full h-full mb-5 transition hover:shadow-xl box-border rounded-b-xl hover:rounded-xl ">
        <div
          className={`w-full rounded-sm aspect-video overflow-hidden  ${
            isEmpty ? "bg-emerald-100" : ""
          }`}
        >
          {projectThumbnail ? (
            <img
              onClick={onClickProject}
              className="cursor-pointer object-cover aspect-video"
              src={projectThumbnail}
              alt={projectName}
            />
          ) : (
            <div onClick={onClickProject} className="cursor-pointer aspect-video"></div>
          )}
        </div>
        <div className="w-full h-1/2 p-1.5">
          <p className="text-sm text-indigo-700 font-bold">
            Published At {formatTimeDifference(projectDate!) || ""}
          </p>
          <div className="w-full inline-flex justify-between items-center gap-2 ">
            <h2
              className="cursor-pointer text-black text-xl text-nowrap overflow-x-hidden "
              onClick={onClickProject}
            >
              {projectName}
            </h2>
            {isPrivate && <HiLockClosed />}
          </div>
          <p className="text-sm">{projectDescription.slice(0, 30)}</p>
          {/* <p className="text-sm">
            {projectParticipate.map((m) => {
              return <span className="mb-1 tag px-1.5">{m}</span>;
            })}
          </p> */}
          <span className="mt-1 text-sm inline-flex flex-wrap">
            {projectTechStacks.slice(0, 5).map((tag, index) => (
              <span className="mb-1 tag px-1.5" key={index}>
                {tag}
              </span>
            ))}
          </span>
        </div>
      </div>
    );
  };
  function formatTimeDifference(uploadedTime: number) {
    const now = new Date().getTime();
    const uploadedDate = new Date(uploadedTime);
    const past = new Date(uploadedTime).getTime();

    const diffInMs = now - past;
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
      return `${year % 100}/${month}`;
    }
  }
  return isEmpty ? preRender() : cardRender();
};

export default ProjectCard;
