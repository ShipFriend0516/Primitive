import { ProjectDetail } from '@/src/Types/ProjectType';
import { Link } from 'react-router-dom';
import { HiLockClosed } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { getGitHubStars } from '@/src/Utils/githubAPI';
import ProjectHoverDetail from '@/src/Components/project/ProjectHoverDetail';
import LoadingSpinner from '@/src/Components/common/loading/LoadingSpinner';
import { MdOutlineHideImage } from 'react-icons/md';

interface ProjectCardProps {
  projectDetail: ProjectDetail;
}

const NewProjectCard = ({ projectDetail }: ProjectCardProps) => {
  const [githubStars, setGithubStars] = useState<number | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
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
    <Link to={'/project/' + projectDetail.id}>
      <div className='relative bg-white shadow shadow-gray-300 rounded-md p-1 flex flex-col justify-center items-center h-[300px]'>
        <div className='w-full h-[200px] overflow-hidden group bg-gray-100 '>
          {!isImageLoaded && (
            <div className={'flex items-center justify-center h-full'}>
              {projectDetail.thumbnail ? (
                <LoadingSpinner
                  className={'text-black/75 w-12 h-12 animate-spin'}
                />
              ) : (
                <MdOutlineHideImage color={'gray'} size={32} />
              )}
            </div>
          )}
          <img
            onLoad={() => setIsImageLoaded(true)}
            className='rounded-t-md w-full h-full object-cover transition-transform group-hover:scale-105 '
            src={projectDetail.thumbnail}
            alt={projectDetail.name}
          />
          <ProjectHoverDetail
            projectDetail={projectDetail}
            githubStars={githubStars || 0}
          />
        </div>
        <Link
          className='p-4 w-full flex flex-col h-[108px]'
          to={`/project/${projectDetail.id}`}
        >
          <div className={'inline-flex items-center gap-2'}>
            {projectDetail.isPrivate && <HiLockClosed />}
            <h3 className='text-lg font-bold'>{projectDetail.name}</h3>
          </div>
          <p className={'text-sm'}>{projectDetail.intro}</p>
        </Link>
      </div>
    </Link>
  );
};

export default NewProjectCard;
