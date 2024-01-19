import NavBar from "../Components/NavBar";

const LoginPage = () => {
  const onSubmit = () => {};

  return (
    <>
      <NavBar />
      <div className="w-screen min-h-screen bg-white flex flex-col justify-center items-center">
        {/* 폼 박스 */}
        <div className="w-1/2 h-1/2 bg-white shadow-2xl p-10 rounded-md border">
          <form className="flex flex-col gap-2" onSubmit={onSubmit}>
            <span className="text-lg">로그인</span>
            <label htmlFor="id" className="block text-sm font-medium leading-6 text-gray-900">
              ID
            </label>
            <input
              type="text"
              name="id"
              id="id"
              autoComplete="id"
              className="block flex-1 border-0 bg-white rounded-md py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="아이디"
            />
            <label htmlFor="pw" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <input
              type="password"
              name="pw"
              id="pw"
              autoComplete="pw"
              className="block flex-1 border-0 bg-white rounded-md py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="비밀번호"
            />
            <div className="block">
              <input id="saveId" type="checkbox" />
              <label htmlFor="saveId"> 아이디 저장</label>
            </div>
            <div className="flex flex-row gap-0 mt-3">
              <button className="border px-2 py-1 hover:bg-black hover:text-white transition border-black flex-1">
                회원가입
              </button>
              <button className="border-l-0 border px-2 py-1 hover:bg-black hover:text-white transition border-black flex-1">
                로그인
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
