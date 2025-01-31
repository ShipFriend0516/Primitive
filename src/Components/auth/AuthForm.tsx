import GlassButton from "@/src/Components/common/button/GlassButton";
import LoadingSpinner from "@/src/Components/common/loading/LoadingSpinner";
import { FaUser } from "react-icons/fa";
import useAuthenticate from "@/src/Hooks/auth/useAuthenticate";

const AuthForm = () => {
  // 회원가입 로직
  const handleSubmit = (e: React.KeyboardEvent | React.MouseEvent) => {
    e.preventDefault();
    if (isLogin) {
      loginUser();
    } else {
      registerUser();
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
    setMessage("");
  };

  const {
    isLogin,
    username,
    password,
    studentYear,
    error,
    email,
    loginLoading,
    checkPassword,
    message,
    setCheckPassword,
    setPassword,
    setEmail,
    setUsername,
    setStudentYear,
    setError,
    loginUser,
    registerUser,
    setIsLogin,
    setMessage,
  } = useAuthenticate();

  return (
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
              inputEmail,
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
            email,
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
          if (e.target.value.length < 8)
            setError("비밀번호는 8자리 이상이어야합니다.");
          else setError("");
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit(e);
          }
        }}
        className={`authInput  ${
          password.length < 8 &&
          password.length > 0 &&
          "outline outline-red-600"
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
      <GlassButton
        onClick={(e) => handleSubmit(e as React.MouseEvent)}
        className={"authBtn flex justify-center items-center"}
        text={
          <>
            {isLogin
              ? `${loginLoading ? "" : "로그인"}`
              : `${loginLoading ? "" : "회원가입"}`}
            {loginLoading && <LoadingSpinner text={"Loading..."} />}
          </>
        }
      />
      <div className="p-1 text-left text-red-500 text-sm">{error}</div>
      <div className="p-1 text-left text-green-500 text-sm">{message}</div>
      {!isLogin && (
        <p className={"p-1 inline-flex items-center gap-1 text-gray-400"}>
          <FaUser />
          회원가입은 운영진 승인 방식입니다.
        </p>
      )}
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
  );
};

export default AuthForm;
