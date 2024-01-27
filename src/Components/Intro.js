import styled from "styled-components";
import logoBanner from "../Images/프미배너.jpg";
const Intro = () => {
  const Cover = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;

    > div {
      position: absolute;
    }

    > div:first-child {
      top: 25%;
      right: 2.5rem;
    }

    > div:last-child {
      top: 75%;
      left: 2.5rem;
    }
  `;

  return (
    <div className="bg-white w-screen min-h-screen pt-14">
      {/* <img src={logoBanner} alt="logoBanner" /> */}
      <Cover className="">
        <div className="top-1/4 right-10 fade_in">
          <p className="text-9xl">PRIMITIVE</p>
          <p className="text-3xl">공주대학교 IT 창업동아리</p>
        </div>
        <div className="w-1/2 absolute top-3/4 left-10 fade_in">
          {/* <img
            className="w-1/4 fade_in"
            src="https://images.unsplash.com/photo-1570701123784-2d41777f5e93?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="imagea"
          /> */}
          <p>
            안녕하세요! 우리는 'Primitive'라는 동아리에요. 2002년도에 임재현 교수님의 지도 아래
            모바일 컴퓨팅 기술을 개발하고 경진대회에도 참가하면서 시작했어요.
          </p>
          <br />
          <p>
            우리 동아리는 프로그래밍을 통해 앱이나 웹사이트처럼 실제로 사용할 수 있는 멋진
            결과물들을 만들어 내고 있답니다. 함께 프로그래밍의 재미를 느껴보고 싶다면, 우리
            'Primitive'에 꼭 가입해보세요!
          </p>
        </div>
      </Cover>
      <Cover className="bg-slate-50">
        <div>
          <p className="text-6xl">무슨 활동을 하나요?</p>
        </div>
        <div>
          <div>활동1</div>
          <div>활동2</div>
          <div>활동3</div>
        </div>
      </Cover>

      <Cover className="">
        <div className="top-1/4 right-10 fade_in">
          <p className="text-6xl">대표 프로젝트</p>
          <p className="text-3xl">이런 활동들을 했습니다!</p>
        </div>
        <div className="grid grid-cols-3 grid-rows-1 ">
          <div className="bg-blue-300 w-full h-full"></div>
          <div className="bg-blue-300 w-full h-full"></div>
          <div className="bg-blue-300 w-full h-full"></div>
        </div>
      </Cover>
    </div>
  );
};

export default Intro;
