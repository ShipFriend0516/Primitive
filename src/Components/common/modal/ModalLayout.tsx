import { ForwardedRef, forwardRef, useEffect } from 'react';

interface ModalLayoutProps {
  children: React.ReactElement | React.ReactElement[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

type Ref = React.RefObject<HTMLDialogElement>;

const ModalLayout = forwardRef<HTMLDialogElement, ModalLayoutProps>(
  ({ children, isOpen, setIsOpen }, ref) => {
    useEffect(() => {
      if (ref !== null && (ref as Ref).current) {
        if (isOpen) {
          (ref as Ref).current?.showModal();
        } else {
          (ref as Ref).current?.close();
        }
      }
    }, [isOpen]);

    useEffect(() => {
      if (ref !== null && (ref as Ref).current) {
        (ref as Ref).current!.addEventListener('close', () => {
          setIsOpen(false);
        });
      }
    }, []);

    return (
      <dialog className={'p-6 bg-white rounded-md '} ref={ref}>
        {children}
      </dialog>
    );
  },
);

export default ModalLayout;
