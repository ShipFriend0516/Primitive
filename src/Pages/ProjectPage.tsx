import { useCallback, useEffect, useRef, useState } from "react";
import NavBar from "../Components/NavBar";
import ProjectCard from "../Components/ProjectCard";
import Footer from "../Components/Footer";
import {
  QueryDocumentSnapshot,
  QueryFieldFilterConstraint,
  collection,
  endAt,
  endBefore,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ProjectDetail } from "../Types/ProjectType";
import useStore from "../store";
import { HiPencilSquare } from "react-icons/hi2";
import Pagination from "../Components/Pagination";
import LoadingCircle from "../Components/LoadingCircle";

type Filter = "default" | "app" | "web" | "personal" | "team";
type MyIndexType = {
  team: QueryFieldFilterConstraint;
  personal: QueryFieldFilterConstraint;
};

const filters = ["personal", "team"];
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
  const [filter, setFilter] = useState<Filter>(isFilter(filterKind) ? filterKind : "default");

  // 페이지네이션
  const [additionalLoading, setAdditionalLoading] = useState(false);
  const lastDocRef = useRef<HTMLDivElement>(null);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>();
  const option = {
    threshold: 0.5,
  };
  const observer = new IntersectionObserver(async (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setAdditionalLoading(true);
        getAdditionalProjects(isLoggedIn || false, lastDoc!);
        setAdditionalLoading(false);
      }
    });
  }, option);

  useEffect(() => {
    if (lastDocRef.current) {
      observer.observe(lastDocRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [isLoggedIn, lastDocRef.current, lastDoc]);

  useEffect(() => {
    navigate(`/project?filter=${filter}`);
  }, [filter]);

  useEffect(() => {
    try {
      if (isLoggedIn) {
        getPrivateProjects();
      } else {
        getProjects();
      }
    } catch (error) {
      console.error("프로젝트 목록 불러오기 실패!", error);
    }
  }, [isLoggedIn, filter]);

  const filterWhere: MyIndexType = {
    team: where("participantsCount", ">", 1),
    personal: where("participantsCount", "==", 1),
  };

  // 메서드
  const getProjects = async () => {
    try {
      // 비로그인 유저는 공개글만
      if (filter === "default") {
        const response = await getDocs(
          query(
            collection(db, "projects"),
            where("isPrivate", "!=", true),
            orderBy("createdAt", "desc")
          )
        );
        setProjects(
          response.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<ProjectDetail, "id">),
          }))
        );
        const lastDoc = response.docs[response.docs.length - 1];
        setLastDoc(lastDoc);
        setProjectsLoading(false);
      } else {
        const response = await getDocs(
          query(
            collection(db, "projects"),
            where("isPrivate", "!=", true),
            filterWhere[filter as keyof MyIndexType],
            orderBy("createdAt", "desc")
          )
        );
        const lastDoc = response.docs[response.docs.length - 1];
        setLastDoc(lastDoc);
        setProjects(
          response.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<ProjectDetail, "id">),
          }))
        );
        setProjectsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getPrivateProjects = async () => {
    try {
      // 로그인 유저
      if (filter === "default") {
        const q = query(collection(db, "projects"), orderBy("createdAt", "desc"), limit(12));
        const response = await getDocs(q);
        setProjects(
          response.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<ProjectDetail, "id">),
          }))
        );
        const lastDoc = response.docs[response.docs.length - 1];
        setLastDoc(lastDoc);
        setProjectsLoading(false);
      } else {
        const q = query(
          collection(db, "projects"),
          filterWhere[filter as keyof MyIndexType],
          orderBy("createdAt", "desc")
        );
        const response = await getDocs(q);
        const data = response.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<ProjectDetail, "id">),
        }));
        const lastDoc = response.docs[response.docs.length - 1];
        setLastDoc(lastDoc);
        setProjects(data);
        setProjectsLoading(false);
      }
    } catch (error) {
      console.error("비공개 글 불러오기 실패", error);
    }
  };

  const getAdditionalProjects = async (isPrivate: boolean, lastDoc: QueryDocumentSnapshot) => {
    try {
      if (lastDoc === null || lastDoc === undefined) return;
      const additionalQuery = query(
        collection(db, "projects"),
        orderBy("createdAt", "desc"),
        ...(isPrivate ? [] : [where("isPrivate", "==", false)]),
        ...(filter !== "default" ? [filterWhere[filter as keyof MyIndexType]] : []),
        limit(12),
        startAfter(lastDoc)
      );

      const response = await getDocs(additionalQuery);
      const data = response.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<ProjectDetail, "id">),
      }));
      console.log(data);
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

  const renderProjects = () => {
    return projects.map((project, index) => (
      <ProjectCard
        key={project.id}
        projectThumbnail={project.thumbnail!}
        projectId={project.id}
        projectName={project.name!}
        projectDate={project.createdAt!}
        projectDescription={project.intro!}
        projectTechStacks={project.techStack!}
        projectParticipate={project.participants}
        isPrivate={project.isPrivate}
      />
    ));
  };

  const preRender = () => {
    return Array(12)
      .fill(0)
      .map((project, index) => (
        <ProjectCard
          isEmpty={true}
          key={index}
          projectThumbnail={project.thumbnail!}
          projectId={project.id}
          projectName={project.name!}
          projectDescription={project.intro!}
          projectTechStacks={project.techStack!}
          projectParticipate={project.participants}
        />
      ));
  };
  return (
    <section className="flex flex-col  min-h-screen justify-between">
      <NavBar />
      <>
        <div className="max-w-7xl mx-auto min-h-fit w-full flex-grow flex flex-col items-center relative pb-20">
          <h1 className="inline-flex text-5xl mt-24 font-bold relative">
            프로젝트
            <Link
              to={"/project/edit"}
              className="projectAddBtn absolute bg-white -right-14 border rounded-full w-12 h-12 flex justify-center items-center text-3xl cursor-pointer hover:bg-indigo-950 hover:text-white"
            >
              <HiPencilSquare />
            </Link>
          </h1>
          <p className="text-lg mt-2 mb-5">프리미티브의 활동들을 모아보세요!</p>
          <div
            id="filterGroup"
            className="w-full justify-center relative flex flex-wrap max-w-full gap-1 mb-5"
          >
            <div
              onClick={() => setFilter("default")}
              className={`${filter === "default" && "selected"}`}
            >
              전체
            </div>
            {filters.map((kind) => (
              <div
                key={kind}
                onClick={() => setFilter(kind as Filter)}
                className={`${filter === kind && "selected"}`}
              >
                {kind.toUpperCase()[0].concat(kind.slice(1))}
              </div>
            ))}
          </div>
          <div
            id="projectGrid"
            className="w-4/5 mx-20 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3"
          >
            {projectsLoading ? preRender() : renderProjects()}
          </div>
          {additionalLoading && <LoadingCircle />}
        </div>
        <div ref={lastDocRef}></div>
      </>
      <Footer />
    </section>
  );
};

export default ProjectPage;
