import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { IoMenuOutline } from 'react-icons/io5';
import { useSpring, animated } from 'react-spring';
import styles from '../../Styles/menu.module.css';
import useAuthStore from '../../store';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

interface Route {
  path: string;
  label: string;
  className?: string;
}

const NavBar = () => {
  // 네비게이트
  const navigate = useNavigate();

  // 전역 상태관리
  const { isLoggedIn, login, logout } = useAuthStore();

  // 페이지 항상 위로
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 이동 시 스크롤을 맨 위로 이동
  }, [pathname]);

  // 모바일 메뉴 관련
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(windowWidth <= 768 ? true : false);

  // 라우트 정보를 배열로 정의
  const routes = [
    { path: '/', label: '소개' },
    { path: '/project', label: '프로젝트' },
    { path: '/members', label: '운영진' },
  ];

  // 로그인 상태에 따라 조건부로 표시할 라우트
  const authRoutes = isLoggedIn
    ? [
        { path: '/mypage', label: '마이페이지' },
        { path: '/notice', label: '공지사항' },
      ]
    : [{ path: '/login', label: '로그인' }];

  // 특별 스타일의 라우트
  const specialRoutes = [
    {
      path: '/recruit',
      label: 'JOIN US',
      className: 'bg-blue-500 hover:text-black',
    },
  ];

  // 모바일 메뉴 관련
  useEffect(() => {
    const handleResize = debounce(() => {
      setWindowWidth(window.innerWidth);
      setIsMobile(windowWidth <= 768 ? true : false);
    }, 50);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
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
    localStorage.removeItem('accessToken');
    logout();
    const auth = getAuth();
    auth.signOut();
    navigate('/');
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        login(user.uid);
      } else {
        logout();
      }
    });
  }, [isLoggedIn]);

  // 라우트 항목 렌더링 함수
  const renderRouteItem = (route: Route, isMobileMenu = false) => {
    const isActive = pathname === route.path;
    const baseClassName = isMobileMenu ? '' : 'navbarTo';
    const activeClassName = isMobileMenu
      ? ''
      : isActive
        ? 'underline underline-offset-4'
        : '';
    const specialClassName = route.className || '';

    return (
      <li
        key={route.path}
        className={`${baseClassName} ${activeClassName} ${specialClassName}`}
        onClick={() => navigate(route.path)}
      >
        {route.label}
      </li>
    );
  };

  return (
    <nav className='w-screen md:h-14 h-10 fixed bg-black z-10 text-white flex flex-row gap-5 justify-between items-center border-b-gray-50 sm:text-lg text-xs hahmlet select-none overflow-hidden'>
      <>
        <li
          className='navbarTo'
          onClick={() => {
            navigate('/');
          }}
        >
          PRIMITIVE
        </li>
      </>
      {isMobile ? (
        <div className='flex items-center cursor-pointer'>
          <IoMenuOutline size={35} onClick={() => handleClick()} />
          {
            <animated.ul className={styles.menu} style={{ ...springs }}>
              {routes.map((route) => renderRouteItem(route, true))}
              {authRoutes.map((route) => renderRouteItem(route, true))}
              {/*{isLoggedIn && <li onClick={logoutHandler}>로그아웃</li>}*/}
              {specialRoutes.map((route) => renderRouteItem(route, true))}
            </animated.ul>
          }
        </div>
      ) : (
        <ul className='flex flex-row h-full'>
          {routes.map((route) => renderRouteItem(route))}
          {authRoutes.map((route) => renderRouteItem(route))}
          {/*{isLoggedIn && (*/}
          {/*  <li className='navbarTo' onClick={logoutHandler}>*/}
          {/*    로그아웃*/}
          {/*  </li>*/}
          {/*)}*/}
          {specialRoutes.map((route) => renderRouteItem(route))}
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
