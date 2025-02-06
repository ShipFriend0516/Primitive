import { useEffect } from "react";

interface ModalLayoutProps {
  children: React.ReactElement | React.ReactElement[];
  ref: React.RefObject<HTMLDialogElement>;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}
const ModalLayout = ({
  children,
  isOpen,
  setIsOpen,
  ref,
}: ModalLayoutProps) => {
  useEffect(() => {
    if (isOpen && ref.current) {
      ref.current.showModal();
    }
  }, [isOpen]);
  return <dialog>{children}</dialog>;
};

export default ModalLayout;
