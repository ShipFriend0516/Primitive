import { useEffect, useRef, useState } from 'react';
import NavBar from '../Components/common/NavBar';
import Footer from '../Components/common/Footer';
import {
  QueryDocumentSnapshot,
  QueryFieldFilterConstraint,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Filter, ProjectDetail } from '../Types/ProjectType';
import useStore from '../store';
import LoadingCircle from '../Components/common/LoadingCircle';
import ScrollToTop from '../Components/common/ScrollToTop';
import NewProjectCard from '@/src/Components/project/NewProjectCard';
import { getLikesCount } from '@/src/api/firebase/like';
import Skeleton from '@/src/Components/common/Skeleton';
import FilterContainer from '@/src/Components/project/FilterContainer';
import ProjectHeader from '@/src/Components/project/ProjectHeader';
import ProjectGridLayout from '@/src/Components/project/ProjectGridLayout';
import useInfiniteScroll from '@/src/Hooks/useInfiniteScroll';

import ProjectSearchBar from '@/src/Components/project/ProjectSearchBar';
import GlassButton from '@/src/Components/common/button/GlassButton';

type MyIndexType = {
  team: QueryFieldFilterConstraint;
  personal: QueryFieldFilterConstraint;
  my: QueryFieldFilterConstraint;
};

// filterKind가 Filter 타입인지 확인하는 함수
const isFilter = (value: any): value is Filter => {
  return ['default', 'app', 'web', 'personal', 'team', 'my'].includes(value);
};

const ProjectPage = () => {
  // 전역상태
  const { isLoggedIn, userId } = useStore();
  const [searchParams] = useSearchParams();
  const filterKind = searchParams.get('filter');
  const navigate = useNavigate();

  // 상태 관리
  const [projects, setProjects] = useState<ProjectDetail[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>(
    isFilter(filterKind) ? filterKind : 'default',
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [isLast, setIsLast] = useState(false);

  const lastDocRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    navigate(`/project?filter=${filter}`);
  }, [filter]);

  useEffect(() => {
    if (searchQuery) navigate(`/project?filter=${searchQuery}`);
  }, [searchQuery]);

  useEffect(() => {
    try {
      getProjects();
      console.log('프로젝트 불러오기...');
    } catch (error) {
      console.error('프로젝트 목록 불러오기 실패!', error);
    }
  }, [isLoggedIn, filter, searchQuery]);

  const filterWhere: MyIndexType = {
    team: where('participantsCount', '>', 1),
    personal: where('participantsCount', '==', 1),
    my: where('authorId', '==', userId),
  };

  // 메서드
  // 무한 스크롤시 추가 프로젝트 불러오기
  const getAdditionalProjects = async (
    isPrivate: boolean,
    lastDoc: QueryDocumentSnapshot,
  ) => {
    try {
      if (lastDoc === null || lastDoc === undefined) return;
      const additionalQuery = query(
        collection(db, 'projects'),
        orderBy('createdAt', 'desc'),
        ...(isPrivate ? [] : [where('isPrivate', '==', false)]),
        ...(filter !== 'default'
          ? [filterWhere[filter as keyof MyIndexType]]
          : []),
        ...(searchQuery !== ''
          ? [where('techStack', 'array-contains', searchQuery)]
          : []),
        limit(12),
        startAfter(lastDoc),
      );

      const response = await getDocs(additionalQuery);
      const data = await Promise.all(
        response.docs.map(async (doc) => ({
          id: doc.id,
          likeCount: (await getLikesCount(doc.id)) || 0,
          ...(doc.data() as Omit<ProjectDetail, 'id'>),
        })),
      );

      const nextLastDoc = response.docs[response.docs.length - 1];
      if (nextLastDoc) {
        setLastDoc(nextLastDoc);
      } else {
        setLastDoc(null);
      }
      setProjects((prev) => [...prev, ...data]);

      console.log('마지막 요소 감지됨');
    } catch (err) {
      console.error(err);
    }
  };

  // 무한 스크롤
  const { additionalLoading, lastDoc, setLastDoc } = useInfiniteScroll({
    triggerFunction: () => getAdditionalProjects(isLoggedIn || false, lastDoc!),
    isLast: isLast,
    observeRef: lastDocRef,
    isLoggedIn: isLoggedIn,
  });

  // 프로젝트 불러오기

  const getProjects = async () => {
    try {
      // 검색 쿼리
      const q = query(
        collection(db, 'projects'),
        orderBy('createdAt', 'desc'),
        ...(isLoggedIn ? [] : [where('isPrivate', '==', false)]),
        ...(filter !== 'default'
          ? [filterWhere[filter as keyof MyIndexType]]
          : []),
        ...(searchQuery !== ''
          ? [where('techStack', 'array-contains', searchQuery)]
          : []),
        limit(12),
      );

      const projectDocs = await getDocs(q);
      const projectsData = await Promise.all(
        projectDocs.docs.map(async (doc) => ({
          id: doc.id,
          likeCount: (await getLikesCount(doc.id)) || 0,
          ...(doc.data() as Omit<ProjectDetail, 'id'>),
        })),
      );

      setProjects(projectsData);

      if (projectDocs.docs.length < 12) {
        setIsLast(true);
      } else {
        setIsLast(false);
      }

      const lastDoc = projectDocs.docs[projectDocs.docs.length - 1];
      setLastDoc(lastDoc);
      setProjectsLoading(false);
    } catch (error) {
      console.error('프로젝트 불러오기 실패', error);
    }
  };

  const preRender = () => {
    return Array(12)
      .fill(0)
      .map((_, index) => (
        <Skeleton
          key={index}
          className={
            'flex flex-col w-full h-[363px] p-1 gap-2 bg-gray-300/50 rounded-b-none'
          }
        >
          <Skeleton className={'w-full h-64'} />
        </Skeleton>
      ));
  };

  const renderProjects = () => {
    return projects.length > 0 ? (
      projects.map((project) => (
        <NewProjectCard key={project.id} projectDetail={project} />
      ))
    ) : (
      <div className='relative bg-white shadow shadow-gray-300 rounded-md p-1 flex flex-col justify-center items-center aspect-square '>
        <p className={'text-xl'}>프로젝트가 없습니다 :(</p>
      </div>
    );
  };

  return (
    <section className='flex flex-col  min-h-screen justify-between'>
      <NavBar />
      <>
        <div className='max-w-7xl mx-auto min-h-fit w-full flex-grow flex flex-col items-center relative pb-20'>
          <ProjectHeader />
          <ProjectSearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filter={filter}
            setFilter={setFilter}
          />
          <ProjectGridLayout>
            {projectsLoading ? preRender() : renderProjects()}
          </ProjectGridLayout>
          {additionalLoading && <LoadingCircle />}
        </div>
        <div ref={lastDocRef}></div>
        <ScrollToTop />
      </>
      <Footer />
    </section>
  );
};

export default ProjectPage;
