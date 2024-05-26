import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import useStore from "../store";
import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import logo from "../Images/logo.webp";
import User from "../Types/User.d";

const MyPage = () => {
  // 전역 상태 관리
  const { isLoggedIn, logout } = useStore();

  // 상태 관리
  const [user, setUser] = useState<User>();
  const [userLoading, setUserLoading] = useState(true);
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
          setUser(userDocSnapshot.data() as User);
          setUserLoading(false);
          console.log(userDocSnapshot.data());
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
          <div className="rounded-full w-20 h-20  md:w-32 md:h-32 overflow-hidden bg-gray-300">
            <img src={logo} alt="프로필사진" />
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
            <div>유저 정보 로딩중</div>
          ) : (
            <div className="userdataTable">
              <div>
                <span>이메일</span>
                <span>{user!.email}</span>
              </div>
              <div>
                <span>권한 등급</span>
                <span>{user!.authority}</span>
              </div>
              <div>
                <span>학번</span>
                <span>{user!.studentYear}학번</span>
              </div>
              <div>
                <span>이름</span>
                <span>{user!.username}</span>
              </div>
            </div>
          )}
        </div>
        {!userLoading &&
        (user!.authority === "관리자" ||
          user!.authority === "회장" ||
          user!.authority === "부회장") ? (
          <div className="mt-8 flex flex-col gap-2 items-start mb-20">
            <h3 className="text-2xl font-bold ">관리자 전용 탭</h3>
            <p>관리자 권한을 갖고 있는 계정입니다.</p>
            <Link to={"/admin"} className="px-4 py-2 bg-indigo-700 text-white rounded-md">
              어드민 페이지로 이동
            </Link>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <Footer />
    </section>
  );
};

export default MyPage;
