import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
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

const LoginPage = () => {
  // 상태관리
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [code, setCode] = useState("");
  const [studentYear, setStudentYear] = useState("");

  // 전역 상태관리
  const { isLoggedIn, login } = useStore();

  // UI 상태
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

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
        const q = query(collection(db, "signupRequests"), where("email", "==", email));

        const querySnapshot = await getDocs(q);
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
          setCode("");
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
    }
  };

  const loginUser = async () => {
    try {
      if (validateLogin()) {
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

    const pwRegex = /[!@#$%^&*?]/;
    if (password.length < 8 || !pwRegex.test(password)) {
      setError("비밀번호는 8자리 이상이며, 특수문자를 포함해야 합니다.");
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
                onChange={(e) => setStudentYear(e.target.value)}
                className="authInput w-1/2"
              />
            </div>
          )}
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="authInput"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e);
              }
            }}
            className="authInput"
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
              {/* <input
                type="password"
                placeholder="프리미티브 인증코드"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="authInput"
              /> */}
            </>
          )}
          <button type="button" onClick={(e) => handleSubmit(e)} className="authBtn">
            {isLogin ? "로그인" : "회원가입"}
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
