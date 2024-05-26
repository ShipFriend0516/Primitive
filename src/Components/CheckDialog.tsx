import React from "react";

interface Dialog {
  message: string;
  btnColor: string;
  setDialogOpen: (arg: boolean) => void;
  onConfirm: () => void;
}

const CheckDialog = ({ message, btnColor, setDialogOpen, onConfirm }: Dialog) => {
  const lines = message.split("\n").length;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={() => setDialogOpen(false)}></div>
      <div className="text-nowrap dialog text-center flex flex-col gap-1 bg-white p-4 rounded shadow-lg z-10">
        {lines > 1 ? message.split("\n").map((line) => <p>{line}</p>) : <p>{message}</p>}
        <div className="flex justify-around mt-2">
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
