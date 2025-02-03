import { ProjectDetail } from "@/src/Types/ProjectType";
import { Link } from "react-router-dom";
import { HiLockClosed } from "react-icons/hi";
import { useEffect, useState } from "react";
import { getGitHubStars } from "@/src/Utils/githubAPI";
import ProjectHoverDetail from "@/src/Components/project/ProjectHoverDetail";

interface ProjectCardProps {
  projectDetail: ProjectDetail;
}

const TestProjectCard = ({ projectDetail }: ProjectCardProps) => {
  const [githubStars, setGithubStars] = useState<number | null>(null);

  useEffect(() => {
    const fetchGitHubStars = async () => {
      if (projectDetail.githubLink) {
        const stars = await getGitHubStars(projectDetail.githubLink);
        setGithubStars(stars);
      }
    };

    fetchGitHubStars();
  }, [projectDetail.githubLink]);

  return (
    <div className="relative bg-white shadow shadow-gray-300 rounded-md p-1 flex flex-col justify-center items-center aspect-square">
      <div className="w-full h-4/5 overflow-hidden group  ">
        <img
          className="rounded-t-md w-full h-full object-cover transition-transform group-hover:scale-105"
          src={projectDetail.thumbnail}
          alt={projectDetail.name}
        />
        <ProjectHoverDetail
          projectDetail={projectDetail}
          githubStars={githubStars || 0}
        />
      </div>

      <Link
        className="p-4 w-full h-2/7 flex flex-col h-[108px]"
        to={`/project/${projectDetail.id}`}
      >
        <div className={"inline-flex items-center gap-2"}>
          {projectDetail.isPrivate && <HiLockClosed />}
          <h3 className="text-xl font-bold">{projectDetail.name}</h3>
        </div>
        <p>{projectDetail.intro}</p>
      </Link>
    </div>
  );
};

export default TestProjectCard;
