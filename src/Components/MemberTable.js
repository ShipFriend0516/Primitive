import React, { useState } from "react";
import CheckDialog from "./CheckDialog";

const MemberTable = ({ members, getInactiveUsers, onDelete }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isShowInactive, setIsShowInactive] = useState(true);

  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedMember(null);
  };

  const openDialog = (member) => {
    setSelectedMember(member);
    setDialogOpen(true);
  };

  return (
    <table className="requestTable">
      <thead>
        <tr className="border-b-2">
          <th>ID</th>
          <th>이름</th>
          <th>학번</th>
          <th>이메일</th>
          <th>권한 등급</th>
          <th>회원 삭제</th>
        </tr>
      </thead>
      <tbody>
        {members.length !== 0 ? (
          <>
            {members.map((member, index) =>
              member === "hr" ? (
                <tr className="w-full text-center py-6" key={index}>
                  <td className="font-bold border-y-4 border-gray-200" colSpan={6}>
                    비활성화된 유저 목록
                  </td>
                </tr>
              ) : (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{member.username}</td>
                  <td>{member.studentYear}</td>
                  <td>{member.email}</td>
                  <td>{member.authority}</td>
                  <td>
                    <button
                      className="bg-red-300 px-2 py-1.5 rounded-md hover:bg-red-400 hover:shadow-lg text-sm text-nowrap"
                      onClick={() => openDialog(member)}
                    >
                      회원 삭제
                    </button>
                  </td>
                </tr>
              )
            )}
            {isShowInactive && (
              <td colSpan={6}>
                <button
                  onClick={() => {
                    getInactiveUsers();
                    setIsShowInactive(false);
                  }}
                  className="text-center px-2 py-1 bg-blue-950 text-white rounded-xl text-sm"
                >
                  비활성화된 유저보기
                </button>
              </td>
            )}
          </>
        ) : (
          <td colSpan={6} className="w-full text-center py-6">
            이럴수가..! 회원이 아무도 없어요.. 🥲
          </td>
        )}
      </tbody>
      {dialogOpen && (
        <CheckDialog
          message={"정말로 이 회원을 삭제하시겠습니까?"}
          btnColor={"red"}
          setDialogOpen={closeDialog}
          onConfirm={() => {
            onDelete(selectedMember);
            closeDialog();
          }}
        />
      )}
    </table>
  );
};

export default MemberTable;
