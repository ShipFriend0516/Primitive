import { useEffect, useState } from "react";
import NavBar from "../Components/common/NavBar";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getRedirectResult,
  GithubAuthProvider,
} from "firebase/auth";

import { collection, addDoc, where, getDocs, query } from "firebase/firestore";
import app, { db } from "../firebase";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useStore from "../store";
import LoadingCircle from "../Components/common/LoadingCircle";

const LoginPage = () => {
  // 상태관리
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [studentYear, setStudentYear] = useState("");

  // 전역 상태관리
  const { isLoggedIn, login } = useStore();

  // UI 상태
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const navigate = useNavigate();

  // 회원가입 로직
  const handleSubmit = (e: React.KeyboardEvent | React.MouseEvent) => {
    e.preventDefault();
    if (isLogin) {
      loginUser();
    } else {
      registerUser();
    }
  };

  const registerUser = async () => {
    try {
      if (validateSignup()) {
        setLoginLoading(true);
        const requestQuery = query(collection(db, "signupRequests"), where("email", "==", email));
        const registeredQuery = query(collection(db, "users"), where("email", "==", email));

        const registeredSnapshot = await getDocs(registeredQuery);
        if (!registeredSnapshot.empty) {
          // 이미 유저있을때
          setError("이미 등록된 이메일입니다.");
          return;
        }
        const querySnapshot = await getDocs(requestQuery);
        if (querySnapshot.empty) {
          await addDoc(collection(db, "signupRequests"), {
            email: email,
            password: password,
            username: username,
            studentYear: studentYear,
            status: "pending",
          });
          setMessage(
            "가입 요청을 성공적으로 기록했습니다. 요청 확인까지 수 일이 소요될 수 있습니다."
          );
          setIsLogin(!isLogin);
          setEmail("");
          setPassword("");
          setCheckPassword("");
          setStudentYear("");
          setUsername("");
        } else {
          setMessage("이미 신청된 요청입니다.");
        }
      } else {
        console.log("유효성 검사 실패");
      }
    } catch (error) {
      console.error(error);
      setError("회원가입 과정 중 오류가 발생했습니다.");
    } finally {
      setLoginLoading(false);
    }
  };

  const loginUser = async () => {
    try {
      if (validateLogin()) {
        setLoginLoading(true);
        const auth = getAuth(app);
        const result = await signInWithEmailAndPassword(auth, email, password);

        if (result) {
          login();
          navigate("/");
        } else {
          setError("로그인에 실패했습니다. 다시 시도해주세요.");
        }
      }
    } catch (error) {
      setError("로그인에 실패했습니다. 다시 시도해주세요.");
      console.error(error);
    } finally {
      setLoginLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
    setMessage("");
  };

  // 유효성 검사
  const validateLogin = () => {
    let isValid = true;
    setError("");

    if (!email.includes("@")) {
      setError("유효한 이메일 주소를 입력해주세요.");
      isValid = false;
    }
    if (password.length < 8) {
      setError("비밀번호는 8자리 이상이어야 합니다.");
      isValid = false;
    }
    return isValid;
  };

  const validateSignup = () => {
    let isValid = true;
    setError("");

    if (username.length < 2) {
      setError("유저네임은 2자리 이상이어야 합니다.");
      isValid = false;
    }

    if (!/^\d{2}$/.test(studentYear)) {
      setError("올바르지 않은 학번 형식입니다. (2자리 숫자)");
      isValid = false;
    }

    if (!email.includes("@")) {
      setError("유효한 이메일 주소를 입력해주세요.");
      isValid = false;
    }

    // const pwRegex = /[!@#$%^&*?]/;
    if (password.length < 8) {
      setError("비밀번호는 8자리 이상이어야합니다.");
      isValid = false;
    }

    if (password !== checkPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      isValid = false;
    }

    return isValid;
  };

  return (
    <section className="flex flex-col   h-screen w-screen overflow-hidden">
      <NavBar />
      <div className="bg-gradient-to-t from-emerald-950 to-indigo-950 w-full flex flex-col justify-center items-center h-screen bollock ">
        <form className="authForm flex flex-col justify-center w-full">
          <h2 className="text-2xl font-bold text-center p-5 text-white">
            {isLogin ? "로그인" : "회원가입"}
          </h2>
          {!isLogin && (
            <div className="flex justify-center gap-3">
              <input
                type="text"
                placeholder="이름"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="authInput w-1/2"
              />
              <input
                type="text"
                placeholder="학번 (예: 21)"
                value={studentYear}
                onChange={(e) => {
                  const data = e.target.value;
                  setStudentYear(data);
                  if (data === "") {
                    setError("");
                  } else if (data.length !== 2 || typeof data !== "number") {
                    setError("학번은 2자리 숫자입니다.");
                  } else {
                    setError("");
                  }
                }}
                className={`authInput w-1/2  ${
                  (isNaN(parseInt(studentYear)) && studentYear.length !== 0) ||
                  (studentYear.length !== 0 && studentYear.length !== 2)
                    ? "outline outline-red-600"
                    : ""
                }`}
              />
            </div>
          )}
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => {
              const inputEmail = e.target.value;
              setEmail(inputEmail);
              if (inputEmail === "") {
                setError("");
              } else if (
                !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                  inputEmail
                )
              ) {
                setError("올바르지 않은 이메일 형식입니다.");
              } else {
                setError("");
              }
            }}
            className={`authInput  ${
              email !== "" ||
              (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                email
              ) &&
                "outline outline-red-600")
            }`}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (e.target.value.length < 8) setError("비밀번호는 8자리 이상이어야합니다.");
              else setError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e);
              }
            }}
            className={`authInput  ${
              password.length < 8 && password.length > 0 && "outline outline-red-600"
            }`}
          />
          {!isLogin && (
            <>
              <input
                type="password"
                placeholder="비밀번호 확인"
                value={checkPassword}
                onChange={(e) => setCheckPassword(e.target.value)}
                className="authInput"
              />
            </>
          )}
          <button
            type="button"
            onClick={(e) => handleSubmit(e)}
            className="authBtn flex justify-center items-center"
          >
            {isLogin ? `${loginLoading ? "" : "로그인"}` : `${loginLoading ? "" : "회원가입"}`}
            {loginLoading && (
              <div className="inline-flex text-rose-100 opacity-90">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  className="h-6 mr-1 animate-spin"
                >
                  <path d="M232,128a104,104,0,0,1-208,0c0-41,23.81-78.36,60.66-95.27a8,8,0,0,1,6.68,14.54C60.15,61.59,40,93.27,40,128a88,88,0,0,0,176,0c0-34.73-20.15-66.41-51.34-80.73a8,8,0,0,1,6.68-14.54C208.19,49.64,232,87,232,128Z"></path>
                </svg>
                Loading...
              </div>
            )}
          </button>
          <div className="p-1 text-left text-red-500 text-sm">{error}</div>
          <div className="p-1 text-left text-green-500 text-sm">{message}</div>
          <div className="w-full flex justify-end text-white py-2">
            <button type="button" onClick={toggleForm} className="text-right">
              {isLogin ? (
                <>
                  회원이 아니라면?<span className="font-bold"> 회원가입</span>
                </>
              ) : (
                <>
                  이미 회원이신가요? <span className="font-bold"> 로그인</span>
                </>
              )}
            </button>
          </div>
          {/* <div className="socialWrapper">
            <button
              onClick={(e) => githubAuthHandler(e)}
              className="text-4xl text-white flex justify-center flex-col items-center"
            >
              <FaGithub />
              <span className="text-sm select-none">Github</span>
            </button>
          </div> */}
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
