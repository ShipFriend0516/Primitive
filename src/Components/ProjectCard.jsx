import { useNavigate } from "react-router-dom";

const ProjectCard = ({
  isEmpty = true,
  projectId,
  projectThumbnail,
  projectName,
  projectDate,
  projectDescription,
  projectParticipate = [],
  projectTechStacks = [],
}) => {
  if (projectThumbnail) {
    isEmpty = false;
  }

  const navigate = useNavigate();

  const onClickProject = () => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="p-2">
      <div
        className={`w-full rounded-lg aspect-video overflow-hidden  ${
          isEmpty ? "bg-lime-100" : ""
        }`}
      >
        <img
          onClick={onClickProject}
          className="cursor-pointer object-cover aspect-video"
          src={projectThumbnail}
          alt={projectName}
        />
      </div>
      <div className="w-full aspect-video p-0.5">
        <p className="text-indigo-400 text-sm">{projectDate}</p>
        <p className=" cursor-pointer text-black text-xl" onClick={onClickProject}>
          {projectName}
        </p>
        <p className="text-sm">{projectDescription}</p>
        <p className="text-sm">
          {projectParticipate.map((m) => {
            return <small>{m} </small>;
          })}
        </p>
        <span className="text-sm inline-flex flex-wrap">
          {projectTechStacks.map((tag, index) => (
            <span className="tag px-2" key={index}>
              {tag}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;