import React, { useState } from "react";
import CheckDialog from "./CheckDialog";

interface RequestTableProps {
  requests: SignupRequest[];
  onApprove: (request: SignupRequest) => Promise<void>;
  onDelete: (request: SignupRequest) => Promise<void>;
}
const RequestTable = ({ requests, onApprove, onDelete }: RequestTableProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<SignupRequest | null>();
  return (
    <table className="requestTable">
      <thead>
        <tr>
          <th>Index</th>
          <th>이름</th>
          <th>학번</th>
          <th>이메일</th>
          <th>수락</th>
          <th>가입 거절</th>
        </tr>
      </thead>
      <tbody>
        {requests.length !== 0 ? (
          requests.map((request, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{request.username}</td>
              <td>{request.studentYear}</td>
              <td>{request.email}</td>
              <td>
                <button
                  className="bg-emerald-300 px-2 py-1.5 rounded-md text-black hover:shadow-lg hover:bg-emerald-400 text-sm text-nowrap"
                  onClick={() => onApprove(request)}
                >
                  수락
                </button>
              </td>
              <td>
                <button
                  className="bg-red-300 px-2 py-1.5 rounded-md hover:bg-red-400 hover:shadow-lg text-sm text-nowrap"
                  onClick={() => {
                    setSelectedRequest(request);
                    setDialogOpen(true);
                  }}
                >
                  가입 거절
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6} className="w-full text-center py-6">
              아무런 회원 가입 요청이 없습니다.. 🥲
            </td>
          </tr>
        )}
      </tbody>
      {dialogOpen && (
        <CheckDialog
          message="가입 요청을 거절하시겠습니까?"
          btnColor="red"
          onConfirm={() => {
            if (selectedRequest) {
              onDelete(selectedRequest);
              setSelectedRequest(null);
              setDialogOpen(false);
            }
          }}
          setDialogOpen={setDialogOpen}
        />
      )}
    </table>
  );
};

export default RequestTable;
