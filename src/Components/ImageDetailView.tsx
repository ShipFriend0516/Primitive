import React from "react";
import { HiOutlineBackspace } from "react-icons/hi2";
import { useState } from "react";
interface ImageDetailViewProps {
  closeModal: () => void;
  thumbnail: string;
}

const ImageDetailView: React.FC<ImageDetailViewProps> = ({ closeModal, thumbnail }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div
      onClick={closeModal}
      className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center "
    >
      <div className="border-4 bg-white border-white p-3 rounded-md z-50 m-5">
        <div className="inline-flex justify-end text-3xl w-full">
          <HiOutlineBackspace className="mx-1 hover:opacity-80 cursor-pointer" />
        </div>
        <div className="flex flex-col justify-center items-center">
          <img
            onLoad={() => setIsImageLoaded(true)}
            src={thumbnail}
            alt="Selected"
            className="detailview max-w-4/5 py-1 "
          />
          {!isImageLoaded && <div className="loader"></div>}
        </div>
      </div>
    </div>
  );
};

export default ImageDetailView;
