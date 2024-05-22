import React from "react";

const CheckDialog = ({ message, btnColor, setDialogOpen, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={() => setDialogOpen(false)}></div>
      <div className="dialog flex flex-col gap-3 bg-white p-4 rounded shadow-lg z-10">
        <p>{message}</p>
        <div className="flex justify-around">
          <button className="px-2 py-1 text-sm" onClick={() => setDialogOpen(false)}>
            취소
          </button>
          <button
            className={`px-2 py-1 text-sm bg-${btnColor}-300 hover:bg-${btnColor}-100`}
            onClick={() => onConfirm()}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckDialog;
