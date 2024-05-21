import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getRedirectResult,
  GithubAuthProvider,
} from "firebase/auth";

import { collection, addDoc } from "firebase/firestore";
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

  // 전역 상태관리
  const { isLoggedIn, login } = useStore();

  // UI 상태
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // 회원가입 로직
  const handleSubmit = (e) => {
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
        const result = await addDoc(collection(db, "signupRequests"), {
          email: email,
          password: password,
          username: username,
          status: "pending",
        });
        console.log("유저 추가", result);
      } else {
        console.log("유효성 검사 실패");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loginUser = async () => {
    try {
      if (validateLogin()) {
        const auth = getAuth(app);
        const result = await signInWithEmailAndPassword(auth, email, password);
        console.log(result);
        if (result.user.accessToken) {
          console.log("로그인 성공");
          login();
          localStorage.setItem("accessToken", result.user.accessToken);
          navigate("/");
        } else {
        }
      }
    } catch (error) {
      setError("로그인에 실패했습니다. 다시 시도해주세요.");
      console.error(error);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
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

    if (username.length < 2) {
      setError("유저네임은 2자리 이상이어야 합니다.");
      isValid = false;
    }

    if (!email.includes("@")) {
      setError("유효한 이메일 주소를 입력해주세요.");
      isValid = false;
    }
    if (password.length < 8 || !/\W/.test(password)) {
      setError("비밀번호는 8자리 이상이며, 특수문자를 포함해야 합니다.");
      isValid = false;
    }

    if (password !== checkPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      isValid = false;
    }

    return isValid;
  };

  // github login
  const githubAuthHandler = async (e) => {
    try {
      e.preventDefault();

      const auth = getAuth();
      const result = await getRedirectResult(auth);
      const credential = GithubAuthProvider.credentialFromResult(result);
      if (credential) {
        const token = credential.accessToken;
      }

      console.log(result);
      console.log(credential);
    } catch (error) {}
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <section className="flex flex-col bg-gradient-to-b from-black to-indigo-950  h-screen w-screen overflow-hidden">
      <NavBar />
      <div className="w-full flex flex-col justify-center items-center h-screen bollock ">
        <form className="authForm flex flex-col justify-center w-full">
          <h2 className="text-2xl font-bold text-center p-5 text-white">
            {isLogin ? "로그인" : "회원가입"}
          </h2>
          {!isLogin && (
            <input
              type="text"
              placeholder="이름을 입력하세요"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="authInput"
            />
          )}
          <input
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="authInput"
          />
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="authInput"
          />
          {!isLogin && (
            <>
              <input
                type="password"
                placeholder="비밀번호를 한 번 더 입력하세요"
                value={checkPassword}
                onChange={(e) => setCheckPassword(e.target.value)}
                className="authInput"
              />
              <input
                type="password"
                placeholder="프리미티브 인증코드"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="authInput"
              />
            </>
          )}
          <button type="button" onClick={handleSubmit} className="authBtn">
            {isLogin ? "로그인" : "회원가입"}
          </button>
          <div className="p-1 text-left text-red-500 text-sm">{error}</div>
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
          <div className="socialWrapper">
            <button
              onClick={(e) => githubAuthHandler(e)}
              className="text-4xl text-white flex justify-center flex-col items-center"
            >
              <FaGithub />
              <span className="text-sm select-none">Github</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
