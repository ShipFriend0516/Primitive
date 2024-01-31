import { useState, useEffect } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../Styles/animations.css";

import { IoMenuOutline } from "react-icons/io5";

const NavBar = () => {
  const To = styled.li`
    font-size: 1.1em;
    padding: 12px 12px;
    transition: 0.2s;
    list-style: none;
    &:hover {
      cursor: pointer;
      color: gray;
      margin: 0 6px;
    }

    &:first:hover {
      margin: 0;
    }

    &:last-child {
      margin-left: 6px;
      margin-right: 0;
    }

    &:last-child:hover {
      color: black;
      margin-left: 8px;
    }
  `;

  const ErrorBox = styled.div`
    color: red;
    font-size: 0.8em;
  `;

  // Menu
  const Menu = styled.ul`
    position: fixed;
    right: 0;
    top: 2.5rem;
    text-align: right;
    width: 50vw;
    box-shadow: 0 1px 3px lightgray;
    padding: 0.625rem;
    z-index: 2;
    background-color: white;
    color: black;

    li {
      font-size: 1.75em;
      padding: 0.35em 0.5em;
      margin-bottom: 5px;
    }

    & li:hover {
      cursor: pointer;
      background-color: lightgray;
      border-radius: 3px;
    }
  `;

  const navigate = useNavigate();

  // 상태관리
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  // 모바일 메뉴 관련
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(windowWidth <= 768 ? true : false);

  // 모바일 메뉴 관련
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsMobile(windowWidth <= 768 ? true : false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 로그인 처리
  const validateEmail = (email) => {
    // 간단한 이메일 정규식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    // 기본적인 유효성 검사
    if (!username.trim() || !password.trim()) {
      setError("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    // 아이디 유효성 검사
    if (username.length < 6 || !validateEmail(username)) {
      setError("올바른 이메일 형식으로 입력해주세요.");
      return;
    }

    // 비밀번호 유효성 검사
    if (password.length < 8) {
      setError("비밀번호는 8글자 이상이어야 합니다.");
      return;
    }

    // 로그인 로직을 추가
    setError("");
    closeModal();
  };

  const handleSignup = () => {
    // 기본적인 유효성 검사
    if (!username.trim() || !password.trim()) {
      setError("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    // 아이디 유효성 검사
    if (username.length < 6 || !validateEmail(username)) {
      setError("올바른 이메일 형식으로 입력해주세요.");
      return;
    }

    // 비밀번호 유효성 검사
    if (password.length < 8) {
      setError("비밀번호는 8글자 이상이어야 합니다.");
      return;
    }

    if (!(password === passwordConfirm)) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 회원가입 로직을 추가
    setError("");
    closeModal();
  };

  // 모달 관련

  useEffect(() => {
    // 모달이 열릴 때 body에 클래스 추가
    if (modalIsOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [modalIsOpen]);

  const loginModalStyle = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: "360px",
      height: "50%",
      margin: "auto",
      border: "1px solid #ccc",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "1px 1px 8px gray",
      animation: "fade_in .9s ease-out .1s 1",
    },
  };

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const renderModal = () => {
    return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="로그인 및 회원가입 모달"
        style={loginModalStyle}
        portalClassName="modal"
      >
        <div className="p-4 ">
          <div className="text-2xl font-bold mb-5">{activeTab.toLocaleUpperCase()}</div>
          {activeTab === "login" && (
            <form>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold text-gray-600 mb-2"
                >
                  아이디:
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-600 mb-2"
                >
                  비밀번호:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border p-2 w-full rounded"
                />
              </div>
              <ErrorBox>{error && error}</ErrorBox>
              <button
                type="button"
                onClick={handleLogin}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                로그인
              </button>
            </form>
          )}
          {activeTab === "signup" && (
            <form>
              <div className="mb-4">
                <label
                  htmlFor="newUsername"
                  className="block text-sm font-semibold text-gray-600 mb-2"
                >
                  아이디:
                </label>
                <input
                  type="text"
                  id="newUsername"
                  name="newUsername"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-semibold text-gray-600 mb-2"
                >
                  비밀번호:
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="newPasswordConfirm"
                  className="block text-sm font-semibold text-gray-600 mb-2"
                >
                  비밀번호 확인:
                </label>
                <input
                  type="password"
                  id="newPasswordConfirm"
                  name="newPasswordConfirm"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className="border p-2 w-full rounded"
                />
              </div>
              <ErrorBox className="mb-2">{error && error}</ErrorBox>
              <button
                type="button"
                onClick={handleSignup}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                회원가입
              </button>
            </form>
          )}
        </div>
        <div className="flex justify-between mb-4">
          <button
            className={`${
              activeTab === "login" ? "text-blue-500" : "text-gray-500"
            } focus:outline-none`}
            onClick={() => {
              setActiveTab("login");
              setError("");
              setPasswordConfirm("");
            }}
          >
            로그인
          </button>
          <button
            className={`${
              activeTab === "signup" ? "text-blue-500" : "text-gray-500"
            } focus:outline-none`}
            onClick={() => {
              setError("");
              setActiveTab("signup");
            }}
          >
            회원가입
          </button>
        </div>
      </Modal>
    );
  };

  return (
    <div className="w-screen md:h-14 h-10 fixed bg-gray-950 z-10 text-white flex flex-row gap-5 justify-between border-b-gray-50 sm:text-lg text-xs hahmlet">
      <>
        <To
          onClick={() => {
            navigate("/");
          }}
        >
          PRIMITIVE
        </To>
        {/* <img src="" alt="logo" /> */}
      </>
      {isMobile ? (
        <div className="flex items-center cursor-pointer">
          <IoMenuOutline size={35} onClick={() => setIsMenuOpen(!isMenuOpen)} />
          {isMenuOpen && (
            <Menu>
              <li onClick={() => navigate("/")}>소개</li>
              <li onClick={() => navigate("/project")}>프로젝트</li>
              <li onClick={() => navigate("/members")}>운영진</li>
              <li onClick={() => openModal()}>로그인</li>
              <li onClick={() => navigate("/recruit")}>JOIN US</li>
            </Menu>
          )}
        </div>
      ) : (
        <ul className="flex flex-row">
          <To
            onClick={() => {
              navigate("/");
            }}
          >
            소개
          </To>
          <To
            onClick={() => {
              navigate("/project");
            }}
          >
            프로젝트
          </To>
          <To
            onClick={() => {
              navigate("/members");
            }}
          >
            운영진
          </To>
          <To
            onClick={() => {
              openModal();
            }}
          >
            로그인
          </To>
          <To
            className="bg-blue-500 hover:text-black"
            onClick={() => {
              navigate("/recruit");
            }}
          >
            JOIN US!
          </To>
        </ul>
      )}

      {renderModal()}
    </div>
  );
};

export default NavBar;
