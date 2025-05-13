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

  // 날짜 포맷팅 함수
  const formatDate = (dateString: number) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Link to={'/project/' + projectDetail.id}>
      <div className='relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden'>
        <div className='w-full h-[200px] overflow-hidden group bg-gray-100'>
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
            className='w-full h-full object-cover transition-transform group-hover:scale-105'
            src={projectDetail.thumbnail}
            alt={projectDetail.name}
          />
          <ProjectHoverDetail
            projectDetail={projectDetail}
            githubStars={githubStars || 0}
          />
        </div>

        <div className='p-6 w-full'>
          <div className='mb-1 flex items-center gap-2'>
            {projectDetail.isPrivate && (
              <HiLockClosed className='text-gray-500' />
            )}
            <h3 className='text-2xl font-semibold'>{projectDetail.name}</h3>
          </div>
          <p className='text-sm text-gray-600 mb-3 overflow-hidden text-ellipsis whitespace-nowrap'>
            {projectDetail.intro}
          </p>

          {/* 작성 일자를 작은 글씨로 표시 */}
          <p className='text-xs text-gray-400'>
            {formatDate(projectDetail.createdAt || 0)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default NewProjectCard;
