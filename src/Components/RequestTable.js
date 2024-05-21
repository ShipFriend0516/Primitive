import React from "react";

const RequestTable = ({ members, onApprove, onDelete }) => {
  return (
    <table className="requestTable">
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>학번</th>
          <th>Email</th>
          <th>수락</th>
          <th>회원 삭제</th>
        </tr>
      </thead>
      <tbody>
        {members.length !== 0 ? (
          members.map((member, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{member.username}</td>
              <td>{member.studentId}</td>
              <td>{member.email}</td>
              <td>
                <button
                  className="bg-emerald-300 px-3 py-1.5 rounded-md text-black"
                  onClick={() => onApprove(member)}
                >
                  수락
                </button>
              </td>
              <td>
                <button
                  className="bg-red-300 px-3 py-1.5 rounded-md"
                  onClick={() => onDelete(member.id)}
                >
                  회원 삭제
                </button>
              </td>
            </tr>
          ))
        ) : (
          <td colSpan={6} className="w-full text-center py-6">
            아무런 회원 가입 요청이 없습니다.. 🥲
          </td>
        )}
      </tbody>
    </table>
  );
};

export default RequestTable;
