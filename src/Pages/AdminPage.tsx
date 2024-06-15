import {
  getDocs,
  query,
  collection,
  doc,
  setDoc,
  updateDoc,
  where,
  getDoc,
  deleteDoc,
  DocumentData,
  orderBy,
} from "firebase/firestore";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import { adminApp, db } from "../firebase";
import { useEffect, useState } from "react";
import RequestTable from "../Components/RequestTable";
import MemberTable from "../Components/MemberTable";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";
import useStore from "../store";
import { useNavigate } from "react-router-dom";
import Member, { MemberDataType } from "../Types/MemberType";
import User from "../Types/User";
import StaffsWord from "../Components/StaffsWord";

const AdminPage = () => {
  // 상태 관리
  const [requests, setRequests] = useState<SignupRequest[]>();
  const [requestLoading, setRequestLoading] = useState(true);

  const [users, setUsers] = useState<MemberDataType[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);

  const [selectedTab, setSelectedTab] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState("");
  const [authorityLevel, setAuthorityLevel] = useState(0);
  const authorityArr = ["동아리원", "관리자", "부회장", "회장"];

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
        const authority = userDoc.data()!.authority;
        const level = userDoc.data()!.authorityLevel;
        const id = userDoc.id;
        setUserId(id);
        if (authority === "관리자" || authority === "회장" || authority === "부회장") {
          setIsAdmin(true);
          setAuthorityLevel(level);
        }
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
      const users = await getDocs(
        query(
          collection(db, "users"),
          where("status", "==", "Active"),
          orderBy("authorityLevel", "desc")
        )
      );
      setUsers(
        users.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<MemberDataType, "id">),
        }))
      );
    } catch (e) {
      console.error(e);
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    checkAdmin();
  }, [isLoggedIn]);

  useEffect(() => {
    getRequests();
    getUsers();
  }, [selectedTab]);

  // 수락 핸들러
  const onApprove = async (request: SignupRequest) => {
    try {
      try {
        // 회원가입 진행 절차
        const auth = getAuth(adminApp);
        const result = await createUserWithEmailAndPassword(
          auth,
          request.email!,
          request.password!
        );
        const userRef = doc(db, "users", result.user.uid);

        await setDoc(userRef, {
          email: request.email,
          username: request.username,
          studentYear: request.studentYear,
          authority: "동아리원",
          authorityLevel: 0,
          status: "Active",
          profileThumbnail: "",
        });
      } catch (e) {
        console.error("회원가입 중 오류 발생", e);
      }

      // signupRequests 컬렉션의 상태를 'accepted'로 업데이트
      const requestRef = doc(db, "signupRequests", request.id);
      await updateDoc(requestRef, {
        status: "approved",
      });

      // 상태 업데이트 (필요한 경우)
      setRequests((prevRequests) => prevRequests!.filter((req) => req.id !== request.id));
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = async (request: SignupRequest) => {
    try {
      // signupRequests 컬렉션의 상태를 'accepted'로 업데이트
      const requestRef = doc(db, "signupRequests", request.id);
      await deleteDoc(requestRef);
      // 상태 업데이트 (필요한 경우)
      setRequests((prevRequests) => prevRequests!.filter((req) => req.id !== request.id));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (member: MemberDataType) => {
    try {
      const userRef = doc(db, "users", member.id);
      await updateDoc(userRef, {
        status: "Inactive",
      });
      setUsers((prev) => prev.filter((mem) => mem.id !== member.id));
    } catch (error) {
      console.error(error);
    }
  };

  const upgradeAuthority = async (id: string, level: number, userLevel: number) => {
    try {
      if (userLevel > level) {
        if (level >= 3) {
          alert("해당 유저는 이미 권한이 최대입니다.");
          return;
        }
        const authority = authorityArr[level + 1];
        await updateDoc(doc(db, "users", id), {
          authority: authority,
          authorityLevel: level + 1,
        });
        getUsers();
      }
    } catch (err) {
      console.error("권한 업 실패", err);
    }
  };

  const downgradeAuthority = async (id: string, level: number, userLevel: number) => {
    try {
      if (userLevel > level) {
        if (level <= 0) {
          alert("해당 유저는 이미 권한이 최소입니다.");
          return;
        }

        const authority = authorityArr[level - 1];
        await updateDoc(doc(db, "users", id), {
          authority: authority,
          authorityLevel: level - 1,
        });
        getUsers();
      }
    } catch (err) {
      console.error("권한 다운 실패", err);
    } finally {
      getUsers();
    }
  };

  const tabRender = () => {
    if (selectedTab === 0) {
      return (
        <div className="overflow-x-scroll">
          <h3 className="text-xl font-bold p-2">회원가입 요청</h3>
          <p className="text-sm px-2 text-gray-600">수락 - 회원등록 | 거절 - 요청 거절</p>
          {requestLoading ? (
            <svg
              className="animate-pulse h-5 w-5 rounded-full bg-green-950"
              viewBox="0 0 24 24"
            ></svg>
          ) : (
            <RequestTable requests={requests!} onApprove={onApprove} onDelete={onDelete} />
          )}
        </div>
      );
    } else if (selectedTab === 1) {
      return (
        <div className="overflow-x-scroll">
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
              onDelete={deleteUser}
              upgrade={upgradeAuthority}
              downgrade={downgradeAuthority}
            />
          )}
        </div>
      );
    } else if (selectedTab === 2) {
      return (
        <div className="overflow-x-scroll">
          <h3 className="text-xl font-bold p-2">회장과 부회장의 메시지</h3>
          <p className="text-sm px-2 text-gray-600 mb-3">
            회장과 부회장이라면 각자의 메시지를 수정할 수 있습니다.
          </p>
          {false ? (
            <svg
              className="animate-pulse h-5 w-5 rounded-full bg-green-950"
              viewBox="0 0 24 24"
            ></svg>
          ) : (
            <StaffsWord id={userId} level={authorityLevel} />
          )}
        </div>
      );
    }
  };

  return (
    <section className="flex flex-col justify-between min-h-screen overflow-x-hidden">
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
                  운영진의 한마디
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
