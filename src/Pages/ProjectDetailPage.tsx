import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";

import Footer from "../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";

import thumbnailEx from "../Images/에코초이스.webp";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import DOMPurify from "dompurify";
import { User, getAuth } from "firebase/auth";
import CheckDialog from "../Components/CheckDialog";
import ProjectType, { ProjectDetail } from "../Types/ProjectType";
import Comment from "../Components/Comment";
import CommentType from "../Types/CommentType";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Effect
  useEffect(() => {
    getProjectDetail();
  }, [id]);

  // 상태관리
  const [project, setProject] = useState<ProjectDetail>();
  const [projectLoading, setProjectLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<CommentType[]>();
  const [commentLoading, setCommentLoading] = useState(true);

  // UI 상태 관리
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProjectOwner, setIsProjectOwner] = useState(false);
  const [userId, setUserId] = useState("");
  const [userLoading, setUserLoading] = useState(true);
  // Effect
  useEffect(() => {
    const auth = getAuth();
    if (auth.currentUser && project) {
      if (auth.currentUser.uid === project!.authorId) {
        // 글 주인이라면
        setIsProjectOwner(true);
      } else {
        setIsProjectOwner(false);
      }
      setUserId(auth.currentUser.uid);
    }
    setUserLoading(false);
  }, [id, project]);

  // Method
  const getProjectDetail = async () => {
    try {
      if (id) {
        const projectRef = doc(db, "projects", id);
        const response = await getDoc(projectRef);
        console.log(response.data());
        setProject({ id: response.id, ...(response.data() as Omit<ProjectDetail, "id">) });
        setProjectLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProject = async () => {
    try {
      if (isProjectOwner) {
        // 글 주인이라면
        await deleteDoc(doc(db, "projects", project!.id));
        navigate("/project");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 댓글 메서드

  const checkIsUser = () => {
    try {
      const auth = getAuth();
      if (auth.currentUser) {
        return auth.currentUser.uid;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getComments = async () => {
    try {
      const response = await getDocs(
        query(collection(db, "comments"), where("projectId", "==", id))
      );

      const usernames = await Promise.all(
        response.docs.map(async (document) => {
          const userId = document.data().authorId;
          const userRef = doc(db, "users", userId);
          const userDoc = await getDoc(userRef);
          return userDoc.data()?.username || "Unknown User";
        })
      );

      const data = response.docs.map((doc, index) => ({
        id: doc.id,
        ...(doc.data() as Omit<CommentType, "id">),
        username: usernames[index],
      }));

      setComments(data);
      setCommentLoading(false);
    } catch (err) {
      console.error(err);
    }
  };
  const postComment = async () => {
    try {
      const isUser = checkIsUser();
      if (isUser) {
        const commentData = {
          projectId: id,
          authorId: isUser,
          comment: comment,
          createdAt: new Date().getTime(),
        };
        await addDoc(collection(db, "comments"), commentData);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      const commentRef = doc(db, "comments", commentId);
      await deleteDoc(commentRef);
      setComments((prev) => prev?.filter((comment) => comment.id !== commentId));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  const renderComments = () => {
    if (comments) {
      return comments.map((comment) => (
        <Comment
          key={comment.id}
          _id={comment.id}
          username={comment.username}
          comment={comment.comment}
          createdAt={new Date(comment.createdAt).getTime()}
          isOwner={userId === comment.authorId}
          deleteComment={deleteComment}
        />
      ));
    }
  };

  // 가정: API로부터 가져온 프로젝트 세부 정보
  const projectEx = {
    thumbnail: thumbnailEx,
    intro: "이건 로딩 전에 뜨는 화면입니다.",
    title: "아직 지원하지 않는 기능이에요!",
    description: "프로젝트의 세부 내용을 확인할 수 있을 예정이에요.",
    date: "23/9 ~ 23/12",
    techStacks: ["React", "Spring Boot", "AWS", "MySQL"],
    participants: ["누군가", "이걸보다니.."],
    // 추가적이거나 특정한 정보를 더 표시하고 싶다면 여기에 추가하세요.
  };

  function formatTimeDifference(uploadedTime: number) {
    const now = new Date().getTime();
    const uploadedDate = new Date(uploadedTime);
    const past = new Date(uploadedTime).getTime();

    const diffInMs = now - past;
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMs / 3600000);
    const diffInDays = Math.floor(diffInMs / 86400000);

    if (diffInMinutes < 1) {
      return "방금 전";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`;
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else {
      const year = uploadedDate.getFullYear();
      const month = String(uploadedDate.getMonth() + 1).padStart(2, "0");
      const day = String(uploadedDate.getDate()).padStart(2, "0");
      return `${year}년 ${month}월 ${day}일`;
    }
  }

  const preRender = () => {
    return (
      <div className="mt-10 md:mt-20 max-w-6xl mx-auto w-full flex-grow flex flex-col items-stretch p-5 md:p-10 gap-2">
        <div className="aspect-project gothic gap-10 flex justify-center items-center text-white w-full object-cover mb-8  bg-gradient-to-br rounded-md bg-gray-200 animate-pulse text-7xl">
          <span className="text-indigo-950 animate-bounce delay-1">.</span>
          <span className="text-indigo-950 animate-bounce delay-2">.</span>
          <span className="text-indigo-950 animate-bounce delay-3">.</span>
        </div>
        <h1 className="w-2/3 h-8 mx-auto text-3xl text-center md:text-5xl font-bold mb-4 rounded-md bg-gray-200 animate-pulse text-transparent">
          {"프로젝트 설명"}
        </h1>
        <p className="w-1/3 mx-auto text-lg mb-4 text-center rounded-md bg-gray-200 animate-pulse text-gray-200">
          {projectEx.intro}
        </p>
        <p className="ml-auto w-1/4 h-4 text-right  mb-4 rounded-md bg-gray-200 animate-pulse text-transparent">
          프로젝트가 작성된 날짜
        </p>
        <div className="w-full inline-flex items-center gap-2 ">
          <h3 className="px-2 rounded-md bg-gray-200 animate-pulse text-gray-200">
            프로젝트 참여자
          </h3>

          {projectEx.participants.map((participant, index) => (
            <span
              key={index}
              className={` px-2  rounded-md bg-gray-200 animate-pulse text-gray-200 gap-2  text-nowrap`}
            >
              {participant}
            </span>
          ))}
        </div>
        <div className="w-full inline-flex items-center gap-2">
          <h3 className="w-fit  px-2  rounded-md bg-gray-200 animate-pulse text-gray-200 ">
            사용한 기술스택
          </h3>
          {projectEx.techStacks.map((tech, index) => (
            <span
              key={index}
              className={`px-2 rounded-md bg-gray-200 animate-pulse text-gray-200 gap-2  text-nowrap`}
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="w-full mt-3 flex flex-col gap-2">
          <div className="w-full h-4 rounded-md bg-gray-200 animate-pulse text-gray-200 projectDescription flex flex-col items-start"></div>
          <div className="w-1/4 h-4  rounded-md bg-gray-200 animate-pulse text-gray-200 projectDescription flex flex-col items-start"></div>
          <div className="w-3/4 h-4 rounded-md bg-gray-200 animate-pulse text-gray-200 projectDescription flex flex-col items-start"></div>
          <div className="w-full h-4 rounded-md bg-gray-200 animate-pulse text-gray-200 projectDescription flex flex-col items-start"></div>
          <div className="w-3/5 h-4 rounded-md bg-gray-200 animate-pulse text-gray-200 projectDescription flex flex-col items-start"></div>
        </div>
      </div>
    );
  };

  const projectRender = () => {
    return (
      <div className="mt-10 md:mt-20 max-w-6xl mx-auto w-full flex-grow flex flex-col items-stretch p-5 md:p-10 gap-2">
        {project!.thumbnail ? (
          <img
            src={project!.thumbnail}
            alt={project!.name}
            className="w-full aspect-project object-cover mb-4 md:mb-6 rounded"
          />
        ) : (
          <div className="gothic gap-10 flex justify-center items-center text-white w-full h-96 object-cover mb-4 rounded bg-gradient-to-br from-indigo-950 to-black text-8xl ">
            <span className="animate-bounce delay-1">.</span>
            <span className="animate-bounce delay-2">.</span>
            <span className="animate-bounce delay-3">.</span>
          </div>
        )}
        <h1 className="text-3xl text-center md:text-5xl font-bold">{project!.name}</h1>
        <p className=" md:text-xl mb-2 text-center">{project!.intro}</p>
        <div className="flex justify-between">
          <span className="text-left w-full mb-2 text-sm">
            {formatTimeDifference(project!.createdAt as number)}
          </span>
          <span className="text-right w-full mb-2 text-sm text-gray-500">
            <button className="mr-1" onClick={() => alert("미지원입니다 지송 ㅎㅎ")}>
              수정
            </button>
            <button onClick={() => setIsDialogOpen(true)}>삭제</button>
          </span>
        </div>
        <div className="w-full inline-flex flex-wrap items-center gap-2 mt-2 text-xs md:text-sm">
          <h3 className="px-2 py-1 bg-indigo-800 text-white rounded-md">프로젝트 참여자</h3>
          {project!.participants!.map((participant, index) => (
            <span
              key={index}
              className={`px-2 py-1 bg-indigo-100 rounded-md gap-2 tagAnimation text-nowrap
                ${index % 2 === 0 && "bg-indigo-50"}
                ${index % 2 === 1 && "bg-indigo-100"}
                hover:bg-indigo-200
                `}
            >
              {participant}
            </span>
          ))}
        </div>
        <div className="w-full inline-flex flex-wrap items-center gap-2 text-xs md:text-sm">
          <h3 className="w-fit px-2 py-1 bg-emerald-900 text-white rounded-md ">사용한 기술스택</h3>
          {project!.techStack!.map((tech, index) => (
            <span
              key={index}
              className={`px-2 py-1 bg-emerald-100 rounded-md gap-2 tagAnimation text-nowrap
                ${index % 2 === 0 && "bg-emerald-50"}
                ${index % 2 === 1 && "bg-emerald-100"}
                hover:bg-emerald-200
                `}
            >
              {tech}
            </span>
          ))}
        </div>
        <article
          className="mt-6 projectDescription flex flex-col items-start"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project!.description!) }}
        ></article>
        <div className="commentsWrapper flex flex-col gap-3">
          <div>{comments?.length || 0}개의 댓글</div>
          <div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border p-4 w-full"
              placeholder="댓글을 작성하세요."
            />
          </div>
          <div className="flex justify-end">
            <button className="px-3 py-1 bg-indigo-600 text-white rounded-md" onClick={postComment}>
              댓글 작성
            </button>
          </div>
        </div>
        <div className="">
          {/* 댓글 */}
          {commentLoading || userLoading ? <div>댓글 로딩 중....</div> : renderComments()}
        </div>

        {isDialogOpen && (
          <CheckDialog
            message={"프로젝트는 삭제하면 복구가 불가능합니다! \n그래도 삭제하시겠습니까?"}
            btnColor={"red"}
            onConfirm={() => deleteProject()}
            setDialogOpen={setIsDialogOpen}
          ></CheckDialog>
        )}
      </div>
    );
  };

  return (
    <section className="flex flex-col min-h-screen  justify-between bg-white text-black">
      <NavBar />
      {projectLoading ? preRender() : projectRender()}
      <Footer />
    </section>
  );
};

export default ProjectDetailPage;
