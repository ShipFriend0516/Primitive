import DefaultModal from '@/src/Components/common/modal/DefaultModal';
import ModalLayout from '@/src/Components/common/modal/ModalLayout';
import useModal from '@/src/Hooks/common/useModal';

interface Params {
  id: string;
  username: string;
  reply: string;
  thumbnailUrl?: string;
  createdAt: number;
  isOwner: boolean;
  deleteReply: (id: string) => Promise<void>;
}

const Reply = ({
  id,
  username,
  reply,
  thumbnailUrl,
  isOwner,
  createdAt,
  deleteReply,
}: Params) => {
  const replyDeleteModalInstance = useModal();
  return (
    <div className='w-full flex flex-col justify-center gap-3 border-b p-3'>
      <div className='flex flex-row items-center gap-3'>
        <div>
          <div className='rounded-full w-12 h-12 bg-gray-300 overflow-hidden'>
            {thumbnailUrl && <img src={thumbnailUrl} alt={username} />}
          </div>
        </div>
        <div className='flex flex-col flex-grow'>
          <div className='font-bold'>{username}</div>
          <div className='font-light text-sm'>
            {new Date(createdAt).toLocaleDateString()}
          </div>
        </div>
        {isOwner && (
          <div className='text-sm text-gray-500'>
            <button className='mr-1'>수정</button>
            <button
              className=''
              onClick={() => replyDeleteModalInstance.toggleModal()}
            >
              삭제
            </button>
          </div>
        )}
      </div>
      <div className='content'>{reply}</div>
      <ModalLayout
        ref={replyDeleteModalInstance.modalRef}
        isOpen={replyDeleteModalInstance.isOpen}
        setIsOpen={replyDeleteModalInstance.setIsOpen}
      >
        <DefaultModal
          title={'답글 삭제'}
          subTitle={'답글을 삭제할까요?'}
          toggleModal={replyDeleteModalInstance.toggleModal}
          confirm={() => deleteReply(id)}
          cancel={replyDeleteModalInstance.toggleModal}
        />
      </ModalLayout>
    </div>
  );
};

export default Reply;
