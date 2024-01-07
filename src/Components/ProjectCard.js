const ProjectCard = ({ projectName, projectDate, projectParticipate, projectTechStacks }) => {
  return (
    <div className="w-full aspect-video bg-blue-400">
      <p>{projectName}</p>
      <p>{projectDate}</p>
      <p>{projectParticipate}</p>
      <p>{projectTechStacks}</p>
    </div>
  );
};

export default ProjectCard;
