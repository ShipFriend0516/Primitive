import React from "react";

const MemberTable = ({ members, onApprove, onDelete }) => {
  return (
    <table className="requestTable">
      <thead>
        <tr>
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
          members.map((member, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{member.username}</td>
              <td>{member.studentYear}</td>
              <td>{member.email}</td>
              <td>{member.authority}</td>
              <td>
                <button
                  className="bg-red-300 px-2 py-1.5 rounded-md hover:bg-red-400 hover:shadow-lg text-sm text-nowrap"
                  onClick={() => onDelete(member)}
                >
                  회원 삭제
                </button>
              </td>
            </tr>
          ))
        ) : (
          <td colSpan={6} className="w-full text-center py-6">
            이럴수가..! 회원이 아무도 없어요.. 🥲
          </td>
        )}
      </tbody>
    </table>
  );
};

export default MemberTable;
