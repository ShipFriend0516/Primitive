import { useNavigate } from "react-router-dom";
import ProjectType from "../Types/ProjectType.d";

const ProjectCard = ({
  isEmpty = true,
  projectId,
  projectThumbnail,
  projectName,
  projectDate,
  projectDescription,
  projectParticipate = [],
  projectTechStacks = [],
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
      <div className="p-2 w-full h-full mb-5 animate-pulse">
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
      <div className="p-2 w-full h-full mb-5">
        <div
          className={`w-full rounded-md aspect-video overflow-hidden  ${
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
          <p className="text-indigo-400 text-sm">{projectDate}</p>
          <p className="cursor-pointer font-semibold text-black text-xl" onClick={onClickProject}>
            {projectName}
          </p>
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

  return isEmpty ? preRender() : cardRender();
};

export default ProjectCard;
