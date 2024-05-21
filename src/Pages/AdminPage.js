import { getDocs, query, collection } from "firebase/firestore";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import MemberTable from "../Components/MemberTable";

const AdminPage = () => {
  // 상태 관리
  const [requests, setRequests] = useState();
  const [loading, setLoading] = useState(true);
  // 메서드
  const getRequests = async () => {
    try {
      const signupRequests = await getDocs(query(collection(db, "signupRequests")));
      console.log(signupRequests);
      setRequests(signupRequests.docs.map((doc) => doc.data()));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRequests();
    console.log(requests);
  }, []);

  return (
    <section className="flex flex-col justify-between min-h-screen">
      <NavBar />
      <div className="max-w-7xl my-20 p-5 mx-auto ">
        <h2 className="text-3xl font-bold">어드민 페이지</h2>
        <h3 className="text-xl">회원가입 요청</h3>

        {loading ? <div>로딩중...</div> : <MemberTable members={requests} />}
      </div>
      <Footer />
    </section>
  );
};

export default AdminPage;
