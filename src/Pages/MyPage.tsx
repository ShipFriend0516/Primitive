import { ChangeEvent, useEffect, useRef, useState } from "react";
import Footer from "../Components/common/Footer";
import NavBar from "../Components/common/NavBar";
import useStore from "../store";
import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db, storage } from "../firebase";
import logo from "../Images/logo.webp";
import User from "../Types/User.d";
import { ProjectDetail } from "../Types/ProjectType";
import LoadingCircle from "../Components/common/LoadingCircle";
import ProjectListCard from "../Components/ProjectListCard";
import UserDataTable from "../Components/UserDataTable";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { HiPlusSmall } from "react-icons/hi2";

const MyPage = () => {
  // 전역 상태 관리
  const { isLoggedIn, logout } = useStore();

  // 상태 관리
  const [user, setUser] = useState<User>();
  const [userLoading, setUserLoading] = useState(true);
  const [showProject, setShowProject] = useState(false);
  const [projects, setProjects] = useState<ProjectDetail[]>();
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [profileThumbnail, setProfileThumbnail] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // UI 상태
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  // 라우터
  const navigate = useNavigate();

  // 이펙트
  useEffect(() => {
    if (isLoggedIn !== undefined) {
      if (!isLoggedIn) {
        alert("로그인이 필요합니다!");
        navigate("/");
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    getUser();
  }, [isLoggedIn]);

  // 메서드
  const getUser = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        // 사용자의 UID를 기반으로 문서의 참조 가져오기
        const userDocRef = doc(db, "users", user.uid);

        // 문서 가져오기
        const userDocSnapshot = await getDoc(userDocRef);

        // 문서가 존재하는지 확인
        if (userDocSnapshot.exists()) {
          // 사용자의 세부 정보를 가져와서 setUser로 설정
          setUser({ id: userDocSnapshot.id, ...userDocSnapshot.data() });
          setProfileThumbnail(userDocSnapshot.data().profileThumbnail);
          setUserLoading(false);
        } else {
          console.log("해당 사용자의 문서가 존재하지 않습니다.");
        }
      } else {
        console.log("현재 사용자가 로그인되어 있지 않습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    logout();
    const auth = getAuth();
    auth.signOut();
    navigate("/");
  };

  const getProjects = async () => {
    try {
      const auth = getAuth();
      if (auth.currentUser) {
        const response = await getDocs(
          query(collection(db, "projects"), where("authorId", "==", auth.currentUser.uid))
        );
        const data = response.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<ProjectDetail, "id">),
        }));

        setProjects(data);
        setProjectsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 이미지 업로드
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      const maxSize = 3 * 1024 * 1024;

      if (!file) {
        return;
      } else {
        setProfileThumbnail("");
      }

      if (file.size > maxSize) {
        alert("파일크기는 3MB 이하여야합니다.");
        e.preventDefault();
        return;
      }
      const lastDotIndex = file.name.lastIndexOf(".");
      if (lastDotIndex === -1) {
        alert("잘못된 이미지입니다.");
        return;
      }
      const savedFile = `profile-images/${user?.username}${getTimeStamp()}${file.name.slice(
        lastDotIndex
      )}`;

      setIsUploading(true);
      const uploadedFile = uploadBytesResumable(ref(storage, savedFile), file);
      console.log(uploadedFile);

      uploadedFile.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);

          switch (snapshot.state) {
            case "paused":
              alert("업로드가 중단되었습니다.");
              setIsUploading(false);
              break;
          }
        },
        (error) => console.error(error),
        async () => {
          const image_url = await getDownloadURL(ref(storage, savedFile));
          setProfileThumbnail(image_url);
          if (user) {
            const result = await updateDoc(doc(db, "users", user.id), {
              profileThumbnail: image_url,
            });
            console.log(result);
          }
          setIsUploading(false);
        }
      );
    } catch (err) {
      console.error(err);
      setIsUploading(false);
    }
  };

  const getTimeStamp = () => {
    const now = new Date();
    const month = now.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줍니다.
    const monthString = month < 10 ? "0" + month : month; // 한 자리 숫자인 경우 앞에 0을 붙입니다.
    const day = now.getDate();
    const dayString = day < 10 ? "0" + day : day; // 한 자리 숫자인 경우 앞에 0을 붙입니다.
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    return `${now.getFullYear()}${monthString}${dayString}${hour}${minute}${second}`;
  };

  // 렌더링
  const profileRender = () => {
    return userLoading ? (
      <div className="profileWrapper flex items-center gap-4 animate-pulse">
        <div className="rounded-full w-32 h-32 overflow-hidden bg-gray-300"></div>
        <div>
          <div className="text-2xl rounded-md bg-gray-300 text-gray-300 mb-2">
            {"user.username"}
          </div>
          <div className="w-2/3 text-sm rounded-md bg-gray-300 text-gray-300">{"설명"}</div>
        </div>
      </div>
    ) : (
      <div className="profileWrapper flex justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div
            onClick={() => {
              if (inputRef.current) {
                inputRef.current.click();
              }
            }}
            className="flex justify-center items-center relative cursor-pointer rounded-full w-20 h-20  md:w-32 md:h-32 overflow-hidden bg-gray-300 profile"
          >
            <img
              src={profileThumbnail || logo}
              className="object-cover"
              alt={`${user?.username}의 프로필사진`}
            />
            <div className="profile-add">
              <HiPlusSmall />
            </div>
            {isUploading && <div className="loader absolute"></div>}
            <input
              ref={inputRef}
              className="hidden"
              type={"file"}
              accept="image/*"
              onChange={(e) => handleImageUpload(e)}
            />
          </div>
          <div className="text-sm"></div>
          <div>
            <div className="text-2xl">{user!.username}</div>
            <div>{user!.studentYear} 학번</div>
          </div>
        </div>
        <div>
          <button
            onClick={() => logoutHandler()}
            className="px-3 py-1 bg-gray-500 text-white rounded-md"
          >
            로그아웃
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="min-h-screen flex flex-col justify-between">
      <NavBar />
      <div className="px-5 md:p-8 max-w-5xl mx-auto w-full flex flex-col ">
        <div className="w-full mt-16 mb-12 mx-auto p-5 border-b">{profileRender()}</div>
        <div className=" w-full flex flex-col gap-2">
          <h3 className="text-2xl font-bold ">내 정보</h3>
          {userLoading ? (
            <LoadingCircle />
          ) : (
            <UserDataTable
              email={user!.email!}
              authority={user!.authority!}
              studentYear={user!.studentYear!}
              username={user!.username!}
            />
          )}
        </div>
        {!userLoading &&
        (user!.authority === "관리자" ||
          user!.authority === "회장" ||
          user!.authority === "부회장") ? (
          <div className="mt-8 flex flex-col gap-2 items-start mb-20">
            <h3 className="text-2xl font-bold ">관리자 전용 탭</h3>
            <p>관리자 권한을 갖고 있는 계정입니다.</p>
            <Link to={"/admin"}>
              <button className="px-4 py-2 bg-indigo-700 text-white rounded-md">
                어드민 페이지로 이동
              </button>
            </Link>
          </div>
        ) : (
          <div></div>
        )}
        <div className="mt-8 flex flex-col gap-2 items-start mb-20">
          <h3 className="text-2xl font-bold ">작성한 프로젝트 모아보기</h3>
          <p>버튼 눌러 작성한 프로젝트를 모아보세요.</p>
          <button
            onClick={() => {
              setShowProject(!showProject);
              getProjects();
            }}
            className="px-4 py-2 bg-emerald-950 text-white rounded-md"
          >
            내가 만든 프로젝트 {showProject ? "닫기" : "보기"}
          </button>
          {showProject && (
            <div className="w-full">
              {projectsLoading ? (
                <LoadingCircle />
              ) : (
                <div className="flex flex-col w-full">
                  {projects!.length > 0 ? (
                    projects!.map((project) => (
                      <ProjectListCard
                        key={project.id}
                        id={project.id}
                        name={project.name!}
                        intro={project.intro!}
                      />
                    ))
                  ) : (
                    <ProjectListCard
                      id="edit"
                      name={"아직 프로젝트를 업로드하지 않았어요!"}
                      intro={
                        "프로젝트 탭에서 새 프로젝트를 생성할 수 있습니다. 클릭해 생성해보세요!"
                      }
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default MyPage;
