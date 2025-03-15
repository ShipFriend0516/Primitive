import { useEffect, useState } from 'react';
import NavBar from '../../Components/common/NavBar';
import Footer from '../../Components/common/Footer';
import { useSpring, animated } from 'react-spring';
import { recruitData } from '@/src/Pages/RecruitPage/data';

const RecruitPage = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDate, setIsDate] = useState(false);
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const now = new Date();
    const start = new Date(2025, 1, 10);
    const end = new Date(2025, 2, 14, 23, 59, 59);
    const weeks = ['일', '월', '화', '수', '목', '금', '토'];

    setTimeString(
      `${start.getFullYear()}년 모집 기간: ${start.getMonth() + 1}월 ${start.getDate()}일 (${weeks[start.getDay()]}) ~ ${end.getMonth() + 1}월 ${end.getDate()}일 (${weeks[end.getDay()]})`,
    );
    setIsDate(now >= start && now <= end);
  }, []);

  const [springs, api] = useSpring(() => ({
    from: {
      opacity: 0,
      maxHeight: 0,
    },
    config: {
      tension: 160,
    },
  }));

  const handleClick = () => {
    setShowInfo(!showInfo);
    api.start({
      to: {
        maxHeight: springs.maxHeight.get() === 0 ? 1440 : 0,
        opacity: springs.opacity.get() === 0 ? 1 : 0,
      },
    });
  };

  const disabledStyle =
    'disabled:bg-gray-200 disabled:hover:shadow-xl disabled:cursor-not-allowed';

  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <div className='flex-grow bg-slate-50 w-screen flex flex-col items-center justify-center py-32 gap-1'>
        {isDate ? (
          <h3 className='md:text-4xl text-3xl text-center'>
            많은 지원 부탁드립니다!
          </h3>
        ) : (
          <h3 className='md:text-4xl text-3xl text-center'>
            지금은 지원기간이 아닙니다!
          </h3>
        )}
        <p>{timeString}</p>
        <div className={'mt-4 flex flex-col gap-4'}>
          <a href={recruitData.form} download>
            <button
              disabled={!isDate}
              className={`bg-white shadow-xl py-2 px-6 rounded-lg hover:shadow-lg hover:shadow-indigo-200  w-72 ${disabledStyle}`}
            >
              👉 모집 신청서 양식 다운로드
            </button>
          </a>
          <a href={recruitData.ot} download>
            <button
              disabled={!isDate}
              className={`bg-white shadow-xl py-2 px-6 rounded-lg hover:shadow-lg hover:shadow-indigo-200  w-72 ${disabledStyle}`}
            >
              👉 신입생 OT 자료 다운로드
            </button>
          </a>
          <a
            href='https://hyeonji0401.github.io/JoinPrimitive/'
            target='_blank'
            rel='noreferrer'
          >
            <button className='bg-yellow-100 py-2 px-6 rounded-lg shadow-xl hover:bg-yellow-200 w-72 '>
              <div>🤔 내가 PRIMITIVE에 들어간다면?</div>
              <div>💡 심리테스트 해보기</div>
            </button>
          </a>
          <button
            className='bg-green-200 py-2 px-6 rounded-lg shadow-xl hover:bg-green-300  w-72'
            onClick={() => handleClick()}
          >
            👀 이번 모집공고 {showInfo ? '닫기' : '확인하기'}
          </button>
        </div>
        <div
          className={`flex flex-col justify-center items-center overflow-hidden ${
            showInfo && 'border-2'
          } p-3 rounded-lg `}
        >
          {loading && (
            <svg
              className='animate-pulse h-5 w-5 rounded-full bg-green-950'
              viewBox='0 0 24 24'
            ></svg>
          )}
          <animated.img
            className={`w-1/2  ${loading ? 'hidden' : ''} ${
              isZoomed ? 'w-full cursor-zoom-out' : 'w-1/2 cursor-zoom-in'
            }`}
            onClick={() => {
              setIsZoomed(!isZoomed);
            }}
            style={{ ...springs }}
            src={recruitData.recruitNotice}
            alt='25년도 모집공고'
            onLoad={() => {
              setLoading(false);
            }}
          ></animated.img>
        </div>
        <div className='flex flex-col items-center mt-20'>
          <p className='text-xl bg-black text-white w-full sm:w-fit px-16 py-1 rounded-tr-lg rounded-tl-lg'>
            신청서 제출 방법
          </p>
          <div className='flex sm:flex-row flex-col  w-full text-white rounded-none sm:rounded-lg overflow-hidden text-nowrap'>
            {[recruitData.presidentData, recruitData.vicePresidentData].map(
              (el) => (
                <div className='flex flex-col bg-slate-800 p-5 flex-1'>
                  <span>{el.position}</span>
                  <span className='text-2xl font-bold'>{el.name}</span>
                  <p>Kakao ID: {el.kakaoID}</p>
                  <p>Email: {el.email}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RecruitPage;
