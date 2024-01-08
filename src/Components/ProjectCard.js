import styled from "styled-components";

const ProjectCard = ({
  isEmpty = true,
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

  const Tag = styled.span`
    padding: 2px 4px;
    margin-right: 4px;
    color: black;
    font-size: 10px;
    background-color: trasparent;
    border: 1px solid gray;
    border-radius: 0.25em;

    &:hover {
      background-color: #f0f0f0;
      transition: 0.2s;
    }
  `;

  return (
    <div className="shadow-sm p-2">
      <div
        className={`w-full rounded-xl aspect-video overflow-hidden  ${
          isEmpty ? `bg-indigo-300` : ""
        }`}
      >
        <img className="object-cover aspect-video" src={projectThumbnail} alt={projectName} />
      </div>
      <div className="w-full aspect-video p-0.5">
        <p className="text-indigo-400 text-sm">{projectDate}</p>
        <p className="text-black text-xl">{projectName}</p>
        <p className="text-sm">{projectDescription}</p>
        <p className="text-sm">
          {projectParticipate.map((m) => {
            return <small>{m} </small>;
          })}
        </p>
        <span className="text-sm">
          {projectTechStacks.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
