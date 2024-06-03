import { useEffect, useState } from "react";
import CommentType from "../Types/CommentType";
import LoadingCircle from "./LoadingCircle";

interface Params {
  id: string;
  username: string;
  reply: string;
  thumbnailUrl?: string;
  createdAt: number;
  isOwner: boolean;
  deleteReply: (id: string) => Promise<void>;
}

const Reply = ({ id, username, reply, thumbnailUrl, isOwner, createdAt, deleteReply }: Params) => {
  return (
    <div className="w-full flex flex-col justify-center gap-3 border-b p-3">
      <div className="flex flex-row items-center gap-3">
        <div>
          <div className="rounded-full w-12 h-12 bg-gray-300 overflow-hidden">
            {thumbnailUrl && <img src={thumbnailUrl} alt={username} />}
          </div>
        </div>
        <div className="flex flex-col flex-grow">
          <div className="font-bold">{username}</div>
          <div className="font-light text-sm">{new Date(createdAt).toLocaleDateString()}</div>
        </div>
        {isOwner && (
          <div className="text-sm text-gray-500">
            <button className="mr-1">수정</button>
            <button className="" onClick={() => deleteReply(id)}>
              삭제
            </button>
          </div>
        )}
      </div>
      <div className="content">{reply}</div>
    </div>
  );
};

export default Reply;
