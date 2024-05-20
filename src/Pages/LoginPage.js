import { useState } from "react";
import NavBar from "../Components/NavBar";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
  // 상태관리
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [code, setCode] = useState("");

  // UI 상태
  const [isLogin, setIsLogin] = useState(true);

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
      if (password === checkPassword) {
        const auth = getAuth();
        const result = await createUserWithEmailAndPassword(auth, email, password);
        console.log(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loginUser = () => {};

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <section className="flex flex-col items from-black to-indigo-950  h-screen w-screen">
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
                value={checkPassword}
                onChange={(e) => setCheckPassword(e.target.value)}
                className="authInput"
              />
            </>
          )}
          <button type="button" onClick={handleSubmit} className="authBtn">
            {isLogin ? "로그인" : "회원가입"}
          </button>
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
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
