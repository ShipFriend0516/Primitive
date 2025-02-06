import React from 'react';

interface DefaultModalProps {
  toggleModal: () => void;
  confirm: () => void;
  cancel: () => void;
  subTitle: string;
  title: string;
}

const DefaultModal = ({
  title,
  subTitle,
  toggleModal,
  confirm,
  cancel,
}: DefaultModalProps) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg w-[320px] p-6 shadow-lg'>
        <h3 className='text-lg font-semibold text-gray-900 mb-2'>{title}</h3>
        <p className='text-gray-600 mb-6'>{subTitle}</p>

        <div className='flex justify-end gap-3'>
          <button
            onClick={cancel}
            className='px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 rounded-md hover:bg-gray-100 transition-colors'
          >
            취소
          </button>
          <button
            onClick={confirm}
            className='px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors'
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default DefaultModal;
