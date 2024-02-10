import project1 from "../Images/에코초이스.webp";
import project2 from "../Images/솜뭉치.webp";
import project3 from "../Images/뜨개랑.webp";

import Introduction1 from "../Images/1.webp";
import Introduction2 from "../Images/2.webp";
import Introduction3 from "../Images/3.webp";
import Introduction4 from "../Images/4.webp";

import ProjectCard from "./ProjectCard";

import { useEffect, useRef } from "react";
import Cover from "./Cover";
import ActivityCard from "./ActivityCard";

const Intro = () => {
  // 스크롤 애니메이션 관련 상태 관리
  const cover1 = useRef(null);
  const cover2 = useRef(null);
  const cover3 = useRef(null);
  const introCardRef = useRef(null);
  const activityCardRef = useRef(null);

  const coverRefs = [cover1, cover2, cover3, introCardRef, activityCardRef];

  useEffect(() => {
    const callback = (entries, observer) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        } else {
          entry.target.style.opacity = "0";
          entry.target.style.transform = "translateY(50px)";
        }
      });
    };

    const observer = new IntersectionObserver(callback, { threshold: 0.05 });

    coverRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    // 컴포넌트가 언마운트되면 observer 해제
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-black w-screen min-h-screen">
      <section className="bg-gradient-to-b from-black to-indigo-950 bg-black text-white h-screen flex flex-col justify-center items-center select-none">
        <div className="top-1/4 mb-10">
          <h1 className="text-center primitive">PRIMITIVE</h1>
          <h2 className="btn-shine text-center">0과 1 사이 무한한 가능성, KNU 프로그래밍 동아리</h2>
        </div>
      </section>
      <section className="bg-white w-screen select-none">
        <div className="shuffleBox bg-gradient-to-b from-indigo-950 to-black">
          <p>Hello 👋 We Learn</p>
          <div className="shuffleAnimation">
            <div className="first">
              <div>Programming</div>
            </div>
            <div className="second">
              <div>Networking</div>
            </div>
            <div className="third">
              <div>Communication</div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white">
        <Cover className=" md:p-20 p-10" ref={cover1}>
          <h3 className="2xl:text-4xl xl:text-4xl lg:text-4xl md:text-3xl sm:text-3xl text-3xl font-bold mb-4">
            Primitive는...
          </h3>
          <p className="md:text-2xl text-xl mb-2">
            PRIMITIVE는 공주대학교 천안캠퍼스에서 활동하고 있는 프로그래밍 동아리입니다.
          </p>
          <p className="md:text-2xl text-xl mb-2">
            열정적인 동아리 부원들과 함께 프로그래밍을 통해 앱이나 웹사이트를 만들어 실제로 사용할
            수 있는 멋진 결과물들을 만들어 내고 있습니다.
          </p>
          <p className="md:text-2xl text-xl mb-2">
            프로그래밍으로 즐겁고 의미있는 대학생활을 보내고 싶다면, PRIMITIVE와 함께 하세요!
          </p>
          <div className="cardSection">
            <div className="introCards mt-10" ref={introCardRef}>
              <div className="w-60 aspect-video text-5xl py-10 px-8 rounded-xl bg-gray-100">
                <h4 className="text-2xl md:text-3xl gothic">활동 기간</h4>
                <span className="font-bold">20년+</span>
              </div>
              <div className="w-60 aspect-video text-5xl py-10 px-8 rounded-xl bg-gray-100">
                <h4 className="text-2xl md:text-3xl gothic">총 동아리원 수</h4>
                <span className="font-bold">200명+</span>
              </div>
              <div className="w-60 aspect-video text-5xl py-10 px-8 rounded-xl bg-gray-100">
                <h4 className="text-2xl md:text-3xl gothic">등록된 프로젝트 수</h4>
                <span className="font-bold">3개</span>
              </div>
            </div>
          </div>
        </Cover>
      </section>
      <section className="bg-slate-50">
        <Cover className=" md:p-20 p-10" ref={cover2}>
          <div className="top-1/4 mb-10">
            <h3 className="2xl:text-4xl xl:text-4xl lg:text-4xl md:text-3xl sm:text-3xl text-3xl font-bold mb-4">
              무슨 활동을 하나요?
            </h3>
            <p className="text-xl">
              정규 활동으로는 신입생 교육과 창업동아리가 있고, 자율적으로 스터디·공모전·프로젝트를
              진행합니다.
            </p>
          </div>
          <div
            className="max-w-7xl mx-auto w-full h-1/2 grid md:grid-cols-2 md:grid-rows-2 grid-cols-1 gap-5 transition-600"
            ref={activityCardRef}
          >
            <ActivityCard backgroundImage={Introduction4}>
              <h4>신입생 교육</h4>
              <p>신입생을 위한 코딩 교육을 진행해요!</p>
            </ActivityCard>
            <ActivityCard backgroundImage={Introduction3}>
              <h4>홈커밍데이</h4>
              <p>졸업생 선배님들의 이야기와 지식을 공유해요!</p>
            </ActivityCard>
            <ActivityCard backgroundImage={Introduction1}>
              <h4>팀 프로젝트 진행</h4>
              <p>팀을 이루어 스터디·공모전·창업동아리를 진행해요!</p>
            </ActivityCard>
            <ActivityCard backgroundImage={Introduction2}>
              <h4>네트워킹</h4>
              <p>회식과 MT 등 동아리 부원과 함께 즐거운 추억을 만들어요!</p>
            </ActivityCard>
          </div>
        </Cover>
      </section>
      <section className="bg-slate-100">
        <Cover className="" ref={cover3}>
          <div className="top-1/4 right-10 fade_in">
            <h3 className="2xl:text-4xl xl:text-4xl lg:text-4xl md:text-3xl sm:text-3xl text-3xl font-bold mb-4">
              대표 프로젝트
            </h3>
            <p className="text-xl">Primitive의 대표 프로젝트에는 이런 것들이 있어요</p>
          </div>
          <div className="w-full h-2/4 grid grid-cols-1 grid-rows-1 md:grid-cols-3 gap-5 ">
            <ProjectCard
              projectThumbnail={project1}
              projectName={"에코초이스"}
              projectDate={"23/09 ~ 23/12"}
              projectDescription={"친환경 이커머스 서비스"}
              // projectParticipate={["서정우", "윤가은"]}
              projectTechStacks={["Web", "React", "Spring", "MySQL", "AWS"]}
            />
            <ProjectCard
              projectThumbnail={project2}
              projectName={"솜뭉치"}
              projectDate={"24/01 ~ "}
              projectDescription={"장애인생산품 판매 중개 플랫폼"}
              // projectParticipate={["이진성", "김유진", "이나경"]}
              projectTechStacks={["App", "Flutter", "Spring"]}
            />
            <ProjectCard
              projectThumbnail={project3}
              projectName={"뜨개랑"}
              projectDate={"24/01 ~ "}
              projectDescription={"뜨개용품 판매 특화 커뮤니티 서비스"}
              // projectParticipate={["이찬규", "홍현지", "박시현"]}
              projectTechStacks={["Web", "React", "Spring"]}
            />
          </div>
        </Cover>
      </section>
    </div>
  );
};

export default Intro;
