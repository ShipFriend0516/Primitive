import { getDocs, query, collection, doc, setDoc, updateDoc, where } from "firebase/firestore";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import MemberTable from "../Components/MemberTable";

const AdminPage = () => {
  // 상태 관리
  const [requests, setRequests] = useState();
  const [requestLoading, setRequestLoading] = useState(true);

  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  // 메서드
  const getRequests = async () => {
    try {
      const signupRequests = await getDocs(
        query(collection(db, "signupRequests"), where("status", "==", "Pending"))
      );

      setRequests(
        signupRequests.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    } catch (e) {
      console.error(e);
    } finally {
      setRequestLoading(false);
    }
  };

  const getUsers = async () => {
    try {
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getRequests();
    console.log(requests);
  }, []);

  // 수락 핸들러
  const onApprove = async (member) => {
    const userRef = doc(db, "users", member.id);

    await setDoc(userRef, {
      ...member,
      status: "Approved",
    });

    // signupRequests 컬렉션의 상태를 'accepted'로 업데이트
    const requestRef = doc(db, "signupRequests", member.id);
    await updateDoc(requestRef, {
      status: "Approved",
    });
    // 상태 업데이트 (필요한 경우)
    setRequests((prevRequests) => prevRequests.filter((req) => req.id !== member.id));
  };

  const onDelete = async (member) => {
    // signupRequests 컬렉션의 상태를 'accepted'로 업데이트
    const requestRef = doc(db, "signupRequests", member.id);
    await updateDoc(requestRef, {
      status: "Rejected",
    });
  };

  return (
    <section className="flex flex-col justify-between min-h-screen">
      <NavBar />
      <div className="max-w-7xl my-20 p-5 mx-auto ">
        <h2 className="text-3xl font-bold">어드민 페이지</h2>
        <h3 className="text-xl">회원가입 요청</h3>

        {requestLoading ? (
          <div>회원가입 요청이 없습니다..</div>
        ) : (
          <MemberTable members={requests} onApprove={onApprove} onDelete={onDelete} />
        )}
      </div>
      <Footer />
    </section>
  );
};

export default AdminPage;
