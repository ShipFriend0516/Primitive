import { useRef, useState } from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);
  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };
  return { modalRef, isOpen, setIsOpen, toggleModal };
};

export default useModal;
