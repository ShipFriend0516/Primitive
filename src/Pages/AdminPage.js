import { getDocs, query, collection, doc, setDoc, updateDoc, where } from "firebase/firestore";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import RequestTable from "../Components/RequestTable";
import MemberTable from "../Components/MemberTable";

const AdminPage = () => {
  // 상태 관리
  const [requests, setRequests] = useState();
  const [requestLoading, setRequestLoading] = useState(true);

  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);

  const [selectedTab, setSelectedTab] = useState(0);
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

  const tabRender = () => {
    if (selectedTab === 0) {
      return (
        <>
          <h3 className="text-xl font-bold p-2">회원가입 요청</h3>
          {requestLoading ? (
            <svg
              className="animate-pulse h-5 w-5 rounded-full bg-green-950"
              viewBox="0 0 24 24"
            ></svg>
          ) : (
            <RequestTable members={requests} onApprove={onApprove} onDelete={onDelete} />
          )}
        </>
      );
    } else if (selectedTab === 1) {
      return (
        <>
          <h3 className="text-xl font-bold p-2">유저 권한 관리</h3>
          {requestLoading ? (
            <svg
              className="animate-pulse h-5 w-5 rounded-full bg-green-950"
              viewBox="0 0 24 24"
            ></svg>
          ) : (
            <MemberTable members={requests} onApprove={onApprove} onDelete={onDelete} />
          )}
        </>
      );
    }
  };

  return (
    <section className="flex flex-col justify-between min-h-screen">
      <NavBar />
      <div className="max-w-5xl w-full mt-16 mb-20 mx-auto p-5">
        <div className="max-w-5xl mx-auto p-5">
          <h2 className="text-3xl font-bold">어드민 페이지</h2>
          <div className="adminTabWrapper">
            <div className={`${selectedTab === 0 && "selected"}`} onClick={() => setSelectedTab(0)}>
              회원가입 요청
            </div>
            <div className={`${selectedTab === 1 && "selected"}`} onClick={() => setSelectedTab(1)}>
              유저 관리
            </div>
            <div className={`${selectedTab === 2 && "selected"}`} onClick={() => setSelectedTab(2)}>
              몰라
            </div>
          </div>
        </div>
        <div className="max-w-5xl p-5 mx-auto ">{tabRender()}</div>
      </div>

      <Footer />
    </section>
  );
};

export default AdminPage;
