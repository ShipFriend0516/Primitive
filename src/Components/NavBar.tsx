import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { IoMenuOutline } from "react-icons/io5";
import { useSpring, animated } from "react-spring";
import styles from "../Styles/menu.module.css";
import useStore from "../store";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const NavBar = () => {
  // 네비게이트
  const navigate = useNavigate();

  // 전역 상태관리
  const { isLoggedIn, login, logout } = useStore();

  // 페이지 항상 위로
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 이동 시 스크롤을 맨 위로 이동
  }, [pathname]);

  // 모바일 메뉴 관련
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(windowWidth <= 768 ? true : false);

  // 모바일 메뉴 관련
  useEffect(() => {
    const handleResize = debounce(() => {
      setWindowWidth(window.innerWidth);
      setIsMobile(windowWidth <= 768 ? true : false);
    }, 50);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  // menu for animaitons
  const [springs, api] = useSpring(() => ({
    from: {
      width: 0,
      opacity: 0,
    },
    config: {
      tension: 280,
    },
  }));

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
    api.start({
      to: {
        opacity: springs.opacity.get() === 0 ? 1 : 0,
        width: springs.width.get() === 0 ? 200 : 0,
      },
    });
  };

  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    logout();
    const auth = getAuth();
    auth.signOut();
    navigate("/");
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        login();
      } else {
        logout();
      }
    });
  }, [isLoggedIn]);

  return (
    <div className="w-screen md:h-14 h-10 fixed bg-gray-950 z-10 text-white flex flex-row gap-5 justify-between border-b-gray-50 sm:text-lg text-xs hahmlet select-none">
      <>
        <li
          className="navbarTo"
          onClick={() => {
            navigate("/");
          }}
        >
          PRIMITIVE
        </li>
      </>
      {isMobile ? (
        <div className="flex items-center cursor-pointer">
          <IoMenuOutline size={35} onClick={() => handleClick()} />
          {true && (
            <animated.ul className={styles.menu} style={{ ...springs }}>
              <li onClick={() => navigate("/")}>소개</li>
              <li onClick={() => navigate("/project")}>프로젝트</li>
              <li onClick={() => navigate("/members")}>운영진</li>
              {isLoggedIn ? (
                <>
                  <li onClick={() => navigate("/mypage")}>마이페이지</li>
                  <li onClick={logoutHandler}>로그아웃</li>
                </>
              ) : (
                <li onClick={() => navigate("/login")}>로그인</li>
              )}
              <li onClick={() => navigate("/recruit")}>JOIN US</li>
            </animated.ul>
          )}
        </div>
      ) : (
        <ul className="flex flex-row">
          <li
            className={`navbarTo ${pathname === "/" ? "underline underline-offset-4" : ""}`}
            onClick={() => navigate("/")}
          >
            소개
          </li>
          <li
            className={`navbarTo ${pathname === "/project" ? "underline underline-offset-4" : ""}`}
            onClick={() => navigate("/project")}
          >
            프로젝트
          </li>
          <li
            className={`navbarTo ${pathname === "/members" ? "underline underline-offset-4" : ""}`}
            onClick={() => navigate("/members")}
          >
            운영진
          </li>
          {isLoggedIn ? (
            <>
              <li
                className={`navbarTo ${
                  pathname === "/mypage" ? "underline underline-offset-4" : ""
                }`}
                onClick={() => navigate("/mypage")}
              >
                마이페이지
              </li>
            </>
          ) : (
            <li
              className={`navbarTo ${pathname === "/login" ? "underline underline-offset-4" : ""}`}
              onClick={() => navigate("/login")}
            >
              로그인
            </li>
          )}
          <li
            className={`navbarTo  bg-blue-500 hover:text-black ${
              pathname === "/recruit" ? "underline underline-offset-4" : ""
            }`}
            onClick={() => navigate("/recruit")}
          >
            JOIN US
          </li>
        </ul>
      )}
    </div>
  );
};

export default NavBar;
