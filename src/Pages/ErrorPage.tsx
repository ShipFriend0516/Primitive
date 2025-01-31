import { useNavigate } from "react-router-dom";
import Footer from "../Components/common/Footer";
import NavBar from "../Components/common/NavBar";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-between w-screen min-h-screen">
      <NavBar />

      <div className="py-64 flex flex-col justify-center items-center gap-5">
        <div className="text-3xl flex items-center">
          <span className="text-4xl">🥺</span> 404 Error 요청하신 페이지를 찾을 수 없습니다.
        </div>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="w-1/4 border shadow-md p-1 rounded-lg hover:shadow-xl transition"
        >
          홈페이지로
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ErrorPage;
