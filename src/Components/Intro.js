import styled from "styled-components";
import logoBanner from "../Images/프미배너.jpg";
const Intro = () => {
  const Cover = styled.div`
    width: 100vw;
    position: relative;
    padding: 5rem;
    padding-top: 100px;
    padding-bottom: 200px;
    > div {
    }

    > div:first-child {
      left: 2.5rem;
    }

    > div:last-child {
      right: 2.5rem;
    }

    
  `;

  const ActivityCard = styled.div`
    padding: 20px;
    box-shadow: 0 0 3px gray;
    border-radius: 5px;
    min-height: 30%;
    position: relative;
    aspect-ratio: 16/9;
    background-color: white;
    h4 {
      font-size: 1.5rem;
    }

    // background-image: url(${logoBanner});
    // background-repeat: no-repeat;
    // background-position: center;
    // background-size: cover;
  `;

  return (
    <div className="bg-white w-screen min-h-screen pt-14">
      {/* <img src={logoBanner} alt="logoBanner" /> */}
      <Cover className="bg-gradient-to-br from-violet-300 to-white ">
        <div className=" top-1/4 fade_in mb-10">
          <p className="2xl:text-6xl xl:text-6xl lg:text-6xl md:text-5xl sm:text-4xl text-2xl">
            PRIMITIVE
          </p>
          <p className="sm:text-3xl text-xl">공주대학교 IT 창업동아리</p>
        </div>
        <div className="top-3/4 fade_in md:text-xl">
          <p>
            Primitive는 2002년도에 임재현 교수님의 지도 아래 모바일 컴퓨팅 기술을 개발하고 경진대회에도 참가하면서 시작했어요.
          </p>
          <br/>
          <p>
            우리 동아리는 프로그래밍을 통해 앱이나 웹사이트처럼 실제로 사용할 수 있는 멋진
            결과물들을 만들어 내고 있습니다. 함께 프로그래밍의 재미를 느껴보고 싶다면, 우리
            'Primitive'에 꼭 가입해보세요!
          </p>
        </div>
      </Cover>

      <Cover className="bg-slate-50 p-20">
        <div className="top-1/4 mb-10">
          <p className="2xl:text-6xl xl:text-6xl lg:text-4xl md:text-3xl sm:text-3xl text-2xl">
            무슨 활동을 하나요?
          </p>
          <p className="text-xl">
            정규 활동으로는 신입생 교육과 공모전 참여가 있고, 비정규 시간에는 자율적으로
            스터디·공모전·프로젝트를 진행합니다.
          </p>
        </div>
        <div className="w-full h-1/2 grid grid-cols-2 grid-rows-2  md:px-10 px-20 gap-5">
          <ActivityCard>
            <h4>신입생 교육</h4>
            <p>매년 1학기에 신입생을 위한 교육을 진행합니다!</p>
          </ActivityCard>
          <ActivityCard>
            <h4>공모전 참여</h4>
            <p>정기적으로 공모전에 참여합니다!</p>
          </ActivityCard>
          <ActivityCard>
            <h4>자율 스터디 운영</h4>
            <p>공부하고 싶은 것이 있다면 자율적으로 스터디를 만들어보세요!</p>
          </ActivityCard>
          <ActivityCard>
            <h4>회식과 MT</h4>
            <p>회식과 MT도 즐겨하는 Primitive!</p>
          </ActivityCard>
        </div>
      </Cover>
      <Cover className="bg-slate-100">
        <div className="top-1/4 right-10 fade_in">
          <p className="2xl:text-6xl xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl text-2xl">
            대표 프로젝트
          </p>
          <p className="text-3xl">이런 활동들을 했습니다!</p>
        </div>
        <div className="w-full h-2/4 grid grid-cols-3 grid-rows-1 gap-5 ">
          <div className="bg-blue-300 w-full h-full"></div>
          <div className="bg-blue-300 w-full h-full"></div>
          <div className="bg-blue-300 w-full h-full"></div>
        </div>
      </Cover>
    </div>
  );
};

export default Intro;
