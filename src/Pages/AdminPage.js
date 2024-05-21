import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";

const AdminPage = () => {
  return (
    <div>
      <NavBar />
      <div className="h-screen">어드민 페이지</div>
      <div>모든 회원 리스트</div>
      <Footer />
    </div>
  );
};

export default AdminPage;
