import {
  FaHeart,
  FaGithub,
  FaEye,
  FaCalendar,
  FaUsers,
  FaStar,
  FaLink,
} from "react-icons/fa";
import ProfileContainer from "@/src/Components/project/ProfileContainer";
import GlassButton from "@/src/Components/common/button/GlassButton";
import { ProjectDetail } from "@/src/Types/ProjectType";
import { Link } from "react-router-dom";
import { HiLockClosed } from "react-icons/hi";

interface ProjectCardProps {
  projectDetail: ProjectDetail;
}

const TestProjectCard = ({ projectDetail }: ProjectCardProps) => {
  return (
    <div className="relative bg-white shadow shadow-gray-300 rounded-md p-1 flex flex-col justify-center items-center aspect-square">
      <div className="w-full h-4/5 overflow-hidden group relative">
        <img
          className="rounded-t-md w-full h-full object-cover transition-transform group-hover:scale-105"
          src={projectDetail.thumbnail}
          alt={projectDetail.name}
        />
        <div className="rounded-md transition-all duration-300 p-6 backdrop-blur-md bg-black/30 w-full h-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 flex flex-col justify-between text-white">
          {/* Upper Section */}
          <div className="space-y-2 ">
            <h3 className="text-2xl font-bold">{projectDetail.name}</h3>
            <p className="text-sm leading-relaxed text-nowrap overflow-x-hidden">
              {projectDetail.intro}
            </p>

            {/* Project Details */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FaCalendar size={16} />
                <span className="text-sm">
                  {new Date(projectDetail.createdAt || 0).toLocaleDateString()}
                  {" Published"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaUsers size={16} />
                <span className="text-sm">
                  {(projectDetail.participants || []).length}명의 팀원
                </span>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {(projectDetail.techStack || []).slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 rounded-full text-xs bg-white/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Lower Section */}
          <div className="space-y-4">
            {/* Action Buttons */}
            <div className="w-full flex gap-2 justify-normal">
              <Link className={"flex-1 "} to={`/project/${projectDetail.id}`}>
                <GlassButton className={"w-full"}>프로젝트 보기</GlassButton>
              </Link>
              {projectDetail.githubLink && (
                <GlassButton
                  className="px-4"
                  onClick={() =>
                    window.open(projectDetail.githubLink, "_blank")
                  }
                >
                  <FaGithub size={18} />
                </GlassButton>
              )}
              {projectDetail.otherLink && (
                <GlassButton
                  className="px-4"
                  onClick={() => window.open(projectDetail.otherLink, "_blank")}
                >
                  <FaLink size={18} />
                </GlassButton>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Profile Section */}
      <Link
        className="p-4 w-full h-1/5 flex items-center justify-between"
        to={`/project/${projectDetail.id}`}
      >
        <ProfileContainer
          username={"정우"}
          thumbnailUrl={"/24/24PrimitiveLogoTransparent.png"}
        />
        <div className={"inline-flex items-center gap-1"}>
          {projectDetail.isPrivate && <HiLockClosed />}
          <h3 className="font-bold">{projectDetail.name}</h3>
        </div>
      </Link>
    </div>
  );
};

export default TestProjectCard;
