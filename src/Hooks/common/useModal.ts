import { useRef, useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDialogElement>();

  return { modalRef, isOpen, setIsOpen };
};

export default useModal;
