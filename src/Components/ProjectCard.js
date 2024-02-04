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

  // const Tag = styled.span`
  //   padding: 2px 6px;
  //   margin-right: 4px;
  //   color: black;
  //   font-size: 12px;
  //   background-color: transparent;
  //   border: 1px solid gray;
  //   border-radius: 0.25em;
  //   background-size: cover;
  //   background-repeat: no-repeat;
  //   background-position: center;

  //   &:hover {
  //     background-color: lightgray;
  //     // color: white;
  //     transition: 0.2s;
  //   }
  // `;

  return (
    <div className="p-2">
      <div
        className={`w-full rounded-lg aspect-video overflow-hidden  ${
          isEmpty ? "bg-lime-100" : ""
        }`}
      >
        <img
          className="cursor-pointer object-cover aspect-video"
          src={projectThumbnail}
          alt={projectName}
        />
      </div>
      <div className="w-full aspect-video p-0.5">
        <p className="text-indigo-400 text-sm">{projectDate}</p>
        <p className=" cursor-pointer text-black text-xl">{projectName}</p>
        <p className="text-sm">{projectDescription}</p>
        <p className="text-sm">
          {projectParticipate.map((m) => {
            return <small>{m} </small>;
          })}
        </p>
        <span className="text-sm">
          {projectTechStacks.map((tag, index) => (
            <span className="tag" key={index}>
              {tag}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
