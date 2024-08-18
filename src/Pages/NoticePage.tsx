import { useState } from "react";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import NoticeBox from "../Components/NoticeBox";

const NoticePage = () => {
  const exNotice = [
    {
      title: "Primitive 홈페이지 개발의도",
      content: "Primitive는..",
      kind: "공지사항",
    },
    {
      title: "프리미티브 홈페이지 업데이트 사항",
      content:
        "이제 프로젝트를 업로드할 때 깃허브와 기타링크 총 2가지의 링크를 추가할 수 있도록 업데이트 되었습니다.",
      kind: "업데이트",
    },
  ];

  // 상태관리
  const [filter, setFilter] = useState("전체");
  const filterKinds = ["전체", "공지사항", "업데이트", "서비스", "공고"];

  const renderNotice = () => {
    return (
      <div className="border-b">
        {exNotice.map((notice) => (
          <NoticeBox kind={notice.kind} title={notice.title} content={notice.content} />
        ))}
      </div>
    );
  };

  return (
    <section className="flex flex-col min-h-screen  justify-between bg-white text-black">
      <NavBar />
      <div className="relative mt-10 md:mt-20 max-w-6xl mx-auto w-full flex-grow flex flex-col items-stretch p-5 md:p-10 gap-2">
        <h1 className="text-4xl">공지사항</h1>
        <div className="noticeFilter py-2 flex gap-3 text-xl">
          {filterKinds.map((kind) => (
            <span
              key={kind}
              onClick={() => setFilter(kind)}
              className={`cursor-pointer ${filter === kind ? "active" : ""}`}
            >
              {kind}
            </span>
          ))}
        </div>
        {renderNotice()}
      </div>
      <Footer />
    </section>
  );
};

export default NoticePage;
