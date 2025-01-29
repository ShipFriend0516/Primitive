import { useEffect, useState } from "react";
import CheckDialog from "../CheckDialog";
import {
  doc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
  getDoc,
  orderBy,
  startAt,
  endAt,
} from "firebase/firestore";
import { db } from "../../firebase";
import { MemberDataType } from "../../Types/MemberType";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { FaArrowCircleDown } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { HiSearch } from "react-icons/hi";

interface MemberTableProps {
  members: MemberDataType[];
  onDelete: (member: MemberDataType) => Promise<void>;
  upgrade: (id: string, level: number, userLevel: number) => Promise<void>;
  downgrade: (id: string, level: number, userLevel: number) => Promise<void>;
}

const MemberTable = ({ members, onDelete, upgrade, downgrade }: MemberTableProps) => {
  // UI 상태관리
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toActiveDialogOpen, setToActiveDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberDataType | null>();
  const [isShowInactive, setIsShowInactive] = useState(true);
  const [inactiveUsers, setInactiveUsers] = useState<MemberDataType[]>([]);

  // 상태 관리
  const [authorityLevel, setAuthorityLevel] = useState(0);
  const authorityArr = ["동아리원", "관리자", "부회장", "회장"];
  const [searchInput, setSearchInput] = useState("");
  const [searchedUsers, setSearchedUsers] = useState<MemberDataType[]>([]);

  // Effect
  useEffect(() => {
    getAuthorityLevel();
  }, []);

  // Method
  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedMember(null);
    setToActiveDialogOpen(false);
  };

  const openDialog = (member: MemberDataType) => {
    setSelectedMember(member);
    setDialogOpen(true);
  };

  const getInactiveUsers = async () => {
    try {
      const users = await getDocs(
        query(
          collection(db, "users"),
          orderBy("studentYear", "asc"),
          where("status", "==", "Inactive")
        )
      );
      const inactiveUsers: MemberDataType[] = users.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<MemberDataType, "id">),
      }));
      setInactiveUsers(inactiveUsers);
      console.log(inactiveUsers);
    } catch (e) {
      console.error(e);
    }
  };

  const onActive = async (member: MemberDataType) => {
    try {
      const userRef = doc(db, "users", member.id);
      await updateDoc(userRef, {
        status: "Active",
      });
      setInactiveUsers((prev) => prev.filter((mem) => mem.id !== member.id));
      members.push(member);
      setSelectedMember(null);
    } catch (error) {
      console.error(error);
    }
  };

  const getAuthorityLevel = async () => {
    try {
      const auth = getAuth();
      if (auth.currentUser) {
        const uid = auth.currentUser.uid;
        const response = await getDoc(doc(db, "users", uid));
        setAuthorityLevel(response.data()!.authorityLevel);
      }
    } catch (err) {
      console.error("권한등급 불러오기 실패", err);
    }
  };

  // 검색
  const searchUserByName = async (username: string) => {
    try {
      const response = await getDocs(
        query(
          collection(db, "users"),
          where("username", ">=", username),
          where("username", "<=", `${username}${"\uf8ff"}`),
          orderBy("authorityLevel", "desc"),
          orderBy("studentYear", "asc")
        )
      );
      const data = response.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<MemberDataType, "id">),
      }));
      setSearchedUsers(data);
      console.log(data);
    } catch (err) {
      console.error("유저 검색 실패", err);
    }
  };

  return (
    <>
      <div className="w-full inline-flex justify-end items-center text-lg">
        <div className="flex justify-end items-center relative border rounded-md py-1 px-2 mb-2">
          <HiSearch className="text-xl left-0" />
          <input
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              searchUserByName(e.target.value);
            }}
            className="outline-none px-2"
            placeholder="유저 이름으로 검색"
          />
        </div>
      </div>
      <hr />
      <table className="requestTable mt-2">
        <thead>
          <tr className="border-b-2">
            <th>Index</th>
            <th>이름</th>
            <th>학번</th>
            <th>이메일</th>
            <th>권한 등급</th>
            <th>회원 삭제</th>
          </tr>
        </thead>
        <tbody>
          {searchedUsers!.length > 0 || searchInput ? (
            searchedUsers!.length > 0 ? (
              searchedUsers!.map((member, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{member.username}</td>
                  <td>{member.studentYear}</td>
                  <td>{member.email}</td>
                  <td className="w-full flex text-center justify-center gap-3 items-center">
                    <span>{member.authority}</span>
                    {authorityLevel > member.authorityLevel && (
                      <div className="flex flex-col gap-0.5 text-gray-400">
                        <button
                          onClick={() => upgrade(member.id, member.authorityLevel, authorityLevel)}
                        >
                          <FaArrowAltCircleUp />
                        </button>
                        <button
                          onClick={() =>
                            downgrade(member.id, member.authorityLevel, authorityLevel)
                          }
                        >
                          <FaArrowCircleDown />
                        </button>
                      </div>
                    )}
                  </td>
                  <td>
                    {member.authorityLevel === 3 ||
                    member.authorityLevel === 2 ||
                    member.authorityLevel === 1 ? (
                      <button className="bg-gray-300 px-2 py-1.5 cursor-default rounded-md hover:shadow-lg text-sm text-nowrap">
                        😎
                      </button>
                    ) : (
                      <button
                        className="bg-red-300 px-2 py-1.5 rounded-md hover:bg-red-400 hover:shadow-lg text-sm text-nowrap"
                        onClick={() => openDialog(member)}
                      >
                        비활성화
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="w-full text-center py-6">
                  유저를 찾을 수 없습니다.
                </td>
              </tr>
            )
          ) : members.length !== 0 ? (
            <>
              {members.map((member, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{member.username}</td>
                  <td>{member.studentYear}</td>
                  <td>{member.email}</td>
                  <td className="w-full flex text-center justify-center gap-3 items-center">
                    <span>{member.authority}</span>
                    {authorityLevel > member.authorityLevel && (
                      <div className="flex flex-col gap-0.5 text-gray-400">
                        <button
                          onClick={() => upgrade(member.id, member.authorityLevel, authorityLevel)}
                        >
                          <FaArrowAltCircleUp />
                        </button>
                        <button
                          onClick={() =>
                            downgrade(member.id, member.authorityLevel, authorityLevel)
                          }
                        >
                          <FaArrowCircleDown />
                        </button>
                      </div>
                    )}
                  </td>
                  <td>
                    {member.authorityLevel === 3 ||
                    member.authorityLevel === 2 ||
                    member.authorityLevel === 1 ? (
                      <button className="bg-gray-300 px-2 py-1.5 cursor-default rounded-md hover:shadow-lg text-sm text-nowrap">
                        😎
                      </button>
                    ) : (
                      <button
                        className="bg-red-300 px-2 py-1.5 rounded-md hover:bg-red-400 hover:shadow-lg text-sm text-nowrap"
                        onClick={() => openDialog(member)}
                      >
                        비활성화
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <tr>
              <td colSpan={6} className="w-full text-center py-6">
                이럴수가..! 회원이 아무도 없어요.. 🥲
              </td>
            </tr>
          )}

          {isShowInactive ? (
            <tr>
              <td colSpan={6}>
                <button
                  onClick={() => {
                    getInactiveUsers();
                    setIsShowInactive(false);
                  }}
                  className="text-center px-2 py-1 bg-blue-950 text-white rounded-xl text-sm hover:shadow-lg"
                >
                  비활성화된 유저보기
                </button>
              </td>
            </tr>
          ) : (
            <>
              {inactiveUsers.map((member, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{member.username}</td>
                  <td>{member.studentYear}</td>
                  <td>{member.email}</td>
                  <td>{member.authority}</td>
                  <td>
                    <button
                      className="bg-green-300 px-2 py-1.5 rounded-md hover:bg-green-400 hover:shadow-lg text-sm text-nowrap"
                      onClick={() => {
                        setToActiveDialogOpen(true);
                        setSelectedMember(member);
                      }}
                    >
                      활성화
                    </button>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
      {dialogOpen && (
        <CheckDialog
          message={"정말로 이 회원을 삭제하시겠습니까?"}
          btnColor={"red"}
          setDialogOpen={closeDialog}
          onConfirm={() => {
            onDelete(selectedMember!);
            closeDialog();
            setSelectedMember(null);
          }}
        />
      )}
      {toActiveDialogOpen && (
        <CheckDialog
          message={"정말로 이 회원을 복구하시겠습니까?"}
          btnColor={"green"}
          setDialogOpen={closeDialog}
          onConfirm={() => {
            onActive(selectedMember!);
            closeDialog();
          }}
        />
      )}
    </>
  );
};

export default MemberTable;
