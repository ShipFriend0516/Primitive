import {
  FaCalendar,
  FaGithub,
  FaHeart,
  FaLink,
  FaStar,
  FaUsers,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import GlassButton from '@/src/Components/common/button/GlassButton';
import { ProjectDetail } from '@/src/Types/ProjectType';

interface ProjectHoverDetailProps {
  projectDetail: ProjectDetail;
  githubStars?: number;
}

const ProjectHoverDetail = ({
  projectDetail,
  githubStars,
}: ProjectHoverDetailProps) => {
  return (
    <div className='rounded-md transition-all duration-300 p-6 backdrop-blur-md bg-black/30 w-full h-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 flex flex-col justify-between text-white'>
      <div
        className='space-y-2'
        aria-label={`[${projectDetail.name}] 프로젝트 디테일`}
      >
        <h3 className='text-2xl font-bold'>{projectDetail.name}</h3>
        <p className='text-sm leading-relaxed text-nowrap overflow-x-hidden'>
          {projectDetail.intro}
        </p>
        <div className='space-y-2'>
          <div className='flex items-center gap-2'>
            <FaCalendar size={16} />
            <span className='text-sm'>
              {new Date(projectDetail.createdAt || 0).toLocaleDateString()}
              {' Published'}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <FaUsers size={16} />
            <span className='text-sm'>
              {(projectDetail.participants || []).length}명의 팀원
            </span>
          </div>
        </div>
        <div className='flex flex-wrap gap-2'>
          {(projectDetail.techStack || []).slice(0, 4).map((tech) => (
            <span
              key={tech}
              className='px-2 py-1 rounded-full text-xs bg-white/20'
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className='space-y-4'>
        {/* Stats */}
        <div className='flex justify-around py-4 '>
          <div className='flex items-center gap-1'>
            <FaHeart size={20} />
            <span className='text-sm'>{projectDetail.likeCount || 0}</span>
          </div>
          {projectDetail.githubLink && (
            <div className='flex items-center gap-1'>
              <FaStar size={20} />
              <span className='text-sm'>
                {githubStars !== null ? githubStars : '-'}
              </span>
            </div>
          )}
        </div>
        <div className='w-full flex gap-2 justify-normal'>
          <Link className={'flex-1 '} to={`/project/${projectDetail.id}`}>
            <GlassButton className={'w-full'}>프로젝트 보기</GlassButton>
          </Link>
          {projectDetail.githubLink && (
            <GlassButton
              className='px-4'
              onClick={() => window.open(projectDetail.githubLink, '_blank')}
            >
              <FaGithub size={18} />
            </GlassButton>
          )}
          {projectDetail.otherLink && (
            <GlassButton
              className='px-4'
              onClick={() => window.open(projectDetail.otherLink, '_blank')}
            >
              <FaLink size={18} />
            </GlassButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectHoverDetail;
