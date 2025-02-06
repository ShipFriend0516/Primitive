import { useRef, useEffect } from 'react';
import ModalLayout from '@/src/Components/common/modal/ModalLayout';
import useModal from '@/src/Hooks/common/useModal';

const TestPage = () => {
  const moon = useRef(null);

  useEffect(() => {
    const callbackFx = (e) => {
      console.log(e);
      if (e[0].isIntersecting) {
        console.log('이녀석 드디어 찾았다..!');
        moon.current.innerText = '🌝';
      } else {
        moon.current.innerText = '🌚';
      }
    };

    if (moon.current) {
      const observer = new IntersectionObserver(callbackFx, { threshold: 0.9 });
      observer.observe(moon.current);
    }
  }, []);

  const { modalRef, isOpen, toggleModal } = useModal();

  return (
    <div className='w-full'>
      <div className={'bg-gray-200 w-full h-52'}>
        <button onClick={() => toggleModal()}>모달 열기</button>
      </div>
      <ModalLayout ref={modalRef} isOpen={isOpen}>
        <div className={'p-10 rounded-md bg-white'}>
          <h2 className={'w-full font-bold text-2xl'}>
            프로젝트를 삭제하시겠습니까?
          </h2>
          <div className={'flex justify-between gap-4'}>
            <button
              className={'px-4 py-1 text-white bg-red-500 rounded-md'}
              onClick={toggleModal}
            >
              닫기
            </button>
            <button
              className={'px-4 py-1 bg-white rounded-md'}
              onClick={toggleModal}
            >
              확인
            </button>
          </div>
        </div>
      </ModalLayout>
      <div className='h-screen'></div>
      <div className='h-screen'></div>
      <span className='text-9xl' ref={moon}>
        🌚
      </span>
      <div className='h-screen'></div>
    </div>
  );
};

export default TestPage;
