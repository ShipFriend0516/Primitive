import { useEffect, useState } from 'react';
import CommentType from '../../Types/CommentType';
import LoadingCircle from '../common/LoadingCircle';
import Reply from './Reply';
import { getAuth } from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import useModal from '@/src/Hooks/common/useModal';
import ModalLayout from '@/src/Components/common/modal/ModalLayout';
import DefaultModal from '@/src/Components/common/modal/DefaultModal';

interface Params {
  id: string;
  username: string;
  comment: string;
  thumbnailUrl?: string;
  createdAt: number;
  isOwner: boolean;
  updateComment: (id: string, comment: string) => Promise<void>;
  deleteComment: (id: string) => Promise<void>;
}

const Comment = ({
  id,
  username,
  comment,
  thumbnailUrl,
  isOwner,
  createdAt,
  updateComment,
  deleteComment,
}: Params) => {
  const [isReplyShow, setIsReplyShow] = useState(false);
  const [reply, setReply] = useState('');
  const [replies, setReplies] = useState<CommentType[]>();
  const [replyLoading, setReplyLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const commentDeleteModalInstance = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    checkIsUser();
  }, []);

  useEffect(() => {
    getReply(id);
  }, [id]);

  // Method

  const checkIsUser = () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        setUserId(user.uid);
        return user.uid;
      } else {
        return false;
      }
    } catch (err) {
      console.error('유저검증실패', err);
    }
  };

  const postReply = async (comment_id: string) => {
    try {
      const isUser = checkIsUser();
      if (isUser) {
        const commentData = {
          projectId: comment_id,
          authorId: isUser,
          comment: reply,
          createdAt: new Date().getTime(),
        };
        await addDoc(collection(db, 'comments'), commentData);
        setReply('');
        getReply(comment_id);
      } else {
        // 유저가 아니라면
        alert('로그인이 필요한 서비스입니다.');
        navigate('/login');
      }
    } catch (e) {
      console.error('답글 작성 중 오류', e);
    }
  };

  const getReply = async (comment_id: string) => {
    try {
      const response = await getDocs(
        query(
          collection(db, 'comments'),
          where('projectId', '==', comment_id),
          orderBy('createdAt'),
        ),
      );

      const userdatas = await Promise.all(
        response.docs.map(async (document) => {
          const userId = document.data().authorId;
          const userRef = doc(db, 'users', userId);
          const userDoc = await getDoc(userRef);
          return {
            username: userDoc.data()?.username,
            profileThumbnail: userDoc.data()?.profileThumbnail,
          };
        }),
      );

      const data = await Promise.all(
        response.docs.map(async (doc, index) => {
          return {
            id: doc.id,
            ...(doc.data() as Omit<CommentType, 'id'>),
            username: userdatas[index].username as string,
            profileThumbnail: userdatas[index].profileThumbnail as string,
          };
        }),
      );

      setReplies(data);
      setReplyLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteReply = async (reply_id: string) => {
    try {
      const commentRef = doc(db, 'comments', reply_id);
      await deleteDoc(commentRef);
      setReplies((prev) => prev?.filter((reply) => reply.id !== reply_id));
    } catch (err) {
      console.error(err);
    }
  };

  const replyRender = () => {
    return (
      isReplyShow && (
        <div className='bg-gray-100 p-3'>
          {replies!.map((reply) => (
            <Reply
              id={reply.id}
              key={reply.id}
              username={reply.username}
              createdAt={reply.createdAt}
              reply={reply.comment}
              isOwner={userId === reply.authorId}
              thumbnailUrl={reply.profileThumbnail}
              deleteReply={() => deleteReply(reply.id)}
            />
          ))}
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className='border p-4 w-full'
            placeholder='답글을 남겨보세요'
          />
          <div className='flex justify-end'>
            <button
              className='px-3 py-1  bg-black text-white rounded-md'
              onClick={() => {
                postReply(id);
              }}
            >
              답글 작성
            </button>
          </div>
        </div>
      )
    );
  };

  return replyLoading ? (
    <LoadingCircle />
  ) : (
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
            {!isEditing && (
              <button
                onClick={() => {
                  setIsEditing(true);
                  setCommentInput(comment);
                }}
                className='mr-1'
              >
                수정
              </button>
            )}
            <button
              onClick={() => {
                commentDeleteModalInstance.toggleModal();
              }}
            >
              삭제
            </button>
          </div>
        )}
      </div>
      {isEditing ? (
        <div>
          <textarea
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            className='border p-4 w-full'
            placeholder='댓글 수정 중...'
          />
          <div className='w-full inline-flex justify-end'>
            <button
              className='px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-md mr-2'
              onClick={() => setIsEditing(false)}
            >
              취소
            </button>
            <button
              className='px-2 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md'
              onClick={() => {
                updateComment(id, commentInput);
                setIsEditing(false);
              }}
            >
              수정
            </button>
          </div>
        </div>
      ) : (
        <div className='content'>{comment}</div>
      )}
      <div
        className='text-emerald-500 cursor-pointer'
        onClick={() => {
          setIsReplyShow(!isReplyShow);
        }}
      >
        {replies!.length || 0}개의 답글
      </div>
      {replyRender()}
      <ModalLayout
        ref={commentDeleteModalInstance.modalRef}
        isOpen={commentDeleteModalInstance.isOpen}
        setIsOpen={commentDeleteModalInstance.setIsOpen}
      >
        <DefaultModal
          title={'댓글 삭제'}
          subTitle={'댓글을 삭제할까요?'}
          toggleModal={commentDeleteModalInstance.toggleModal}
          confirm={() => deleteComment(id)}
          cancel={commentDeleteModalInstance.toggleModal}
        />
      </ModalLayout>
    </div>
  );
};

export default Comment;
