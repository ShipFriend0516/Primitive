import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import useStore from "../store";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const MyPage = () => {
  // 전역 상태 관리
  const { isLoggedIn, login, logout } = useStore();

  // 상태 관리
  const [user, setUser] = useState();
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
          setUser(userDocSnapshot.data());
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

  // 렌더링
  const profileRender = () => {
    return userLoading ? (
      <div className="profileWrapper flex items-center gap-4 animate-pulse">
        <div className="rounded-full w-32 h-32 overflow-hidden bg-gray-300">
          <div width={200} height={200} />
        </div>
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
          <div className="rounded-full w-32 h-32 overflow-hidden bg-gray-300">
            <div width={200} height={200} />
          </div>
          <div>
            <div className="text-2xl">{user.username}</div>
            <div>{user.studentYear} 학번</div>
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
      <div className="max-w-5xl w-full mt-16 mb-20 mx-auto p-5 border-b">{profileRender()}</div>

      <Footer />
    </section>
  );
};

export default MyPage;
