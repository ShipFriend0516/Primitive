import { useEffect, useRef, useState } from "react";
import NavBar from "../Components/common/NavBar";
import Footer from "../Components/common/Footer";
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
} from "firebase/firestore";
import { db } from "../firebase";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Filter, ProjectDetail } from "../Types/ProjectType";
import useStore from "../store";
import LoadingCircle from "../Components/common/LoadingCircle";
import ScrollToTop from "../Components/common/ScrollToTop";
import TestProjectCard from "@/src/Components/project/TestProjectCard";
import { getLikesCount } from "@/src/api/firebase/like";
import Skeleton from "@/src/Components/common/Skeleton";
import FilterContainer from "@/src/Components/project/FilterContainer";
import ProjectHeader from "@/src/Components/project/ProjectHeader";
import ProjectGridLayout from "@/src/Components/project/ProjectGridLayout";
import useInfiniteScroll from "@/src/Hooks/useInfiniteScroll";
import { FaPlus, FaSearch } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type MyIndexType = {
  team: QueryFieldFilterConstraint;
  personal: QueryFieldFilterConstraint;
};

// filterKind가 Filter 타입인지 확인하는 함수
const isFilter = (value: any): value is Filter => {
  return ["default", "app", "web", "personal", "team"].includes(value);
};

const ProjectPage = () => {
  // 전역상태
  const { isLoggedIn } = useStore();
  const [searchParams] = useSearchParams();
  const filterKind = searchParams.get("filter");
  const navigate = useNavigate();

  // 상태 관리
  const [projects, setProjects] = useState<ProjectDetail[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>(
    isFilter(filterKind) ? filterKind : "default",
  );
  const [tagFilter, setTagFilter] = useState("");
  const [isLast, setIsLast] = useState(false);

  const lastDocRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    navigate(`/project?filter=${filter}`);
  }, [filter]);

  useEffect(() => {
    if (tagFilter) navigate(`/project?filter=${tagFilter}`);
  }, [tagFilter]);

  useEffect(() => {
    try {
      getProjects();
      console.log("프로젝트 불러오기...");
    } catch (error) {
      console.error("프로젝트 목록 불러오기 실패!", error);
    }
  }, [isLoggedIn, filter, tagFilter]);

  const filterWhere: MyIndexType = {
    team: where("participantsCount", ">", 1),
    personal: where("participantsCount", "==", 1),
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
        collection(db, "projects"),
        orderBy("createdAt", "desc"),
        ...(isPrivate ? [] : [where("isPrivate", "==", false)]),
        ...(filter !== "default"
          ? [filterWhere[filter as keyof MyIndexType]]
          : []),
        ...(tagFilter !== ""
          ? [where("techStack", "array-contains", tagFilter)]
          : []),
        limit(12),
        startAfter(lastDoc),
      );

      const response = await getDocs(additionalQuery);
      const data = await Promise.all(
        response.docs.map(async (doc) => ({
          id: doc.id,
          likeCount: (await getLikesCount(doc.id)) || 0,
          ...(doc.data() as Omit<ProjectDetail, "id">),
        })),
      );

      const nextLastDoc = response.docs[response.docs.length - 1];
      if (nextLastDoc) {
        setLastDoc(nextLastDoc);
      } else {
        setLastDoc(null);
      }
      setProjects((prev) => [...prev, ...data]);

      console.log("마지막 요소 감지됨");
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
        collection(db, "projects"),
        orderBy("createdAt", "desc"),
        ...(isLoggedIn ? [] : [where("isPrivate", "==", false)]),
        ...(filter !== "default"
          ? [filterWhere[filter as keyof MyIndexType]]
          : []),
        ...(tagFilter !== ""
          ? [where("techStack", "array-contains", tagFilter)]
          : []),
        limit(12),
      );

      const projectDocs = await getDocs(q);
      const projectsData = await Promise.all(
        projectDocs.docs.map(async (doc) => ({
          id: doc.id,
          likeCount: (await getLikesCount(doc.id)) || 0,
          ...(doc.data() as Omit<ProjectDetail, "id">),
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
      console.error("프로젝트 불러오기 실패", error);
    }
  };

  const preRender = () => {
    return Array(12)
      .fill(0)
      .map((el) => (
        <Skeleton
          className={
            "flex flex-col w-full h-[363px] p-1 gap-2 bg-gray-300/50 rounded-b-none"
          }
        >
          <Skeleton className={"w-full h-64"} />
        </Skeleton>
      ));
  };

  const renderProjects = () => {
    return projects.map((project) => (
      <TestProjectCard key={project.id} projectDetail={project} />
    ));
  };

  return (
    <section className="flex flex-col  min-h-screen justify-between">
      <NavBar />
      <>
        <div className="max-w-7xl mx-auto min-h-fit w-full flex-grow flex flex-col items-center relative pb-20">
          <ProjectHeader />
          <FilterContainer
            filter={filter}
            setFilter={setFilter}
            setTagFilter={setTagFilter}
            tagFilter={tagFilter}
          />
          <div
            className={
              "relative w-4/5 h-12 flex justify-between border-b pb-2 mb-2"
            }
          >
            <div
              className={
                "flex items-center relative w-1/3 border border-gray-300 rounded-md overflow-hidden"
              }
            >
              <FaSearch
                size={20}
                color={"gray"}
                className={"w-10 text-xl px-2 "}
              />
              <input
                className={"flex-1 focus:outline-none"}
                type={"text"}
                placeholder={"프로젝트 검색"}
              />
            </div>
            <div className={"flex items-center gap-2"}>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="필터 선택" />
                </SelectTrigger>
                <SelectContent className={"bg-white"}>
                  <SelectItem value="all">모든 프로젝트</SelectItem>
                  <SelectItem value="recent">최근 업데이트</SelectItem>
                  <SelectItem value="starred">즐겨찾기</SelectItem>
                  <SelectItem value="my">내 프로젝트</SelectItem>
                </SelectContent>
              </Select>
              <Link
                to={"/project/edit"}
                className="h-full flex items-center gap-2 px-2 py-1 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 transition-colors duration-200 shadow-sm"
              >
                <FaPlus className="w-4 h-4" />새 프로젝트
              </Link>
            </div>
          </div>
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
