import {
  getDocs,
  query,
  collection,
  doc,
  setDoc,
  updateDoc,
  where,
  getDoc,
} from "firebase/firestore";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import RequestTable from "../Components/RequestTable";
import MemberTable from "../Components/MemberTable";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";
import useStore from "../store";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  // 상태 관리
  const [requests, setRequests] = useState();
  const [requestLoading, setRequestLoading] = useState(true);

  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);

  const [selectedTab, setSelectedTab] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  // UI 상태

  // 전역 상태
  const { isLoggedIn, logout } = useStore();

  // router
  const navigate = useNavigate();

  // 메서드

  // 어드민 체크
  const checkAdmin = async () => {
    // 어드민 페이지 접근 권한 확인
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const userRef = doc(db, "users", uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.data().authority === "관리자") setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });
  };

  const getRequests = async () => {
    try {
      const signupRequests = await getDocs(
        query(collection(db, "signupRequests"), where("status", "==", "pending"))
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
      const users = await getDocs(query(collection(db, "users"), where("status", "==", "Active")));
      setUsers(
        users.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    } catch (e) {
      console.error(e);
    } finally {
      setUsersLoading(false);
    }
  };

  const getInactiveUsers = async () => {
    try {
      const users = await getDocs(
        query(collection(db, "users"), where("status", "==", "Inactive"))
      );
      const inactiveUsers = users.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers((prev) => [...prev, "hr", ...inactiveUsers]);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    console.log("isLoggedIn", isLoggedIn);

    checkAdmin();
  }, [isLoggedIn]);

  useEffect(() => {
    getRequests();
    getUsers();
  }, [selectedTab]);

  // 수락 핸들러
  const onApprove = async (member) => {
    try {
      try {
        // 회원가입 진행 절차
        const auth = getAuth();
        const result = await createUserWithEmailAndPassword(auth, member.email, member.password);

        const userRef = doc(db, "users", result.user.uid);

        await setDoc(userRef, {
          email: member.email,
          username: member.username,
          studentYear: member.studentYear,
          authority: "동아리원",
          status: "Active",
        });
      } catch (e) {
        console.error("회원가입 중 오류 발생", e);
      }

      // signupRequests 컬렉션의 상태를 'accepted'로 업데이트
      const requestRef = doc(db, "signupRequests", member.id);
      await updateDoc(requestRef, {
        status: "approved",
      });

      // 상태 업데이트 (필요한 경우)
      setRequests((prevRequests) => prevRequests.filter((req) => req.id !== member.id));
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = async (member) => {
    try {
      // signupRequests 컬렉션의 상태를 'accepted'로 업데이트
      const requestRef = doc(db, "signupRequests", member.id);
      await updateDoc(requestRef, {
        status: "rejected",
      });
      // 상태 업데이트 (필요한 경우)
      setRequests((prevRequests) => prevRequests.filter((req) => req.id !== member.id));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (member) => {
    try {
      console.log(member);
      const userRef = doc(db, "users", member.id);
      await updateDoc(userRef, {
        status: "Inactive",
      });
      setUsers((prev) => prev.filter((mem) => mem.id !== member.id));
    } catch (error) {
      console.error(error);
    }
  };

  const tabRender = () => {
    if (selectedTab === 0) {
      return (
        <>
          <h3 className="text-xl font-bold p-2">회원가입 요청</h3>
          <p className="text-sm px-2 text-gray-600">수락 - 회원등록 | 거절 - 요청 거절</p>
          {requestLoading ? (
            <svg
              className="animate-pulse h-5 w-5 rounded-full bg-green-950"
              viewBox="0 0 24 24"
            ></svg>
          ) : (
            <RequestTable requests={requests} onApprove={onApprove} onDelete={onDelete} />
          )}
        </>
      );
    } else if (selectedTab === 1) {
      return (
        <>
          <h3 className="text-xl font-bold p-2">유저 권한 관리</h3>
          <p className="text-sm px-2 text-gray-600">회원 삭제 - 회원 비활성화</p>
          {usersLoading ? (
            <svg
              className="animate-pulse h-5 w-5 rounded-full bg-green-950"
              viewBox="0 0 24 24"
            ></svg>
          ) : (
            <MemberTable
              members={users}
              getInactiveUsers={getInactiveUsers}
              onDelete={deleteUser}
            />
          )}
        </>
      );
    }
  };

  return (
    <section className="flex flex-col justify-between min-h-screen">
      <NavBar />
      <div className="max-w-5xl w-full mt-16 mb-20 mx-auto p-1 md:p-5">
        {isAdmin ? (
          <>
            <div className="max-w-5xl mx-auto p-5">
              <h2 className="text-3xl font-bold">어드민 페이지</h2>
              <div className="adminTabWrapper">
                <div
                  className={`${selectedTab === 0 && "selected"}`}
                  onClick={() => setSelectedTab(0)}
                >
                  회원가입 요청
                </div>
                <div
                  className={`${selectedTab === 1 && "selected"}`}
                  onClick={() => setSelectedTab(1)}
                >
                  유저 관리
                </div>
                <div
                  className={`${selectedTab === 2 && "selected"}`}
                  onClick={() => setSelectedTab(2)}
                >
                  몰라
                </div>
              </div>
            </div>
            <div className="max-w-5xl p-5 mx-auto">{tabRender()}</div>
          </>
        ) : (
          <div className="flex flex-col mx-auto max-w-2xl items-start gap-3">
            <h2 className="text-3xl font-bold">어드민 페이지</h2>
            <p>관리자만 접근할 수 있는 페이지입니다!</p>
            <button
              className="p-3 bg-emerald-950 text-white rounded-lg"
              onClick={() => navigate("/login")}
            >
              관리자라면 로그인
            </button>
          </div>
        )}
      </div>
      <Footer />
    </section>
  );
};

export default AdminPage;
