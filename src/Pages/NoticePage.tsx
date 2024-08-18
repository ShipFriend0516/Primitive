import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import NoticeBox from "../Components/NoticeBox";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Notice from "../Types/NoticeType";
import LoadingCircle from "../Components/LoadingCircle";
import { useNavigate } from "react-router-dom";

const NoticePage = () => {
  const exNotice = [
    {
      title: "Primitive 홈페이지 개발의도",
      content: "Primitive는..",
      category: "공지사항",
    },
    {
      title: "프리미티브 홈페이지 업데이트 사항",
      content:
        "이제 프로젝트를 업로드할 때 깃허브와 기타링크 총 2가지의 링크를 추가할 수 있도록 업데이트 되었습니다.",
      category: "업데이트",
    },
  ];

  const filtercategorys = ["전체", "공지사항", "업데이트", "서비스", "공고"];

  // 상태관리
  const navigate = useNavigate();
  const [filter, setFilter] = useState("전체");
  const [notices, setNotices] = useState<Notice[]>([]);
  const [noticeLoading, setNoticeLoading] = useState(true);

  // Effect
  useEffect(() => {
    getNotices();
  }, [filter]);

  // Method
  const getNotices = async () => {
    // 공지사항 목록 불러오기
    let q;
    if (filter === "전체") q = query(collection(db, "notices"));
    else q = query(collection(db, "notices"), where("category", "==", filter));
    const response = await getDocs(q);

    const data = response.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Notice, "id">),
    }));
    setNotices(data);
    setNoticeLoading(false);
  };

  // 렌더

  const renderNotice = () => {
    return noticeLoading ? (
      <LoadingCircle color="bg-indigo-200" />
    ) : (
      <div className="border-b">
        {notices.length === 0 && <div>공지사항이 없습니다...</div>}
        {notices.map((notice, index) => (
          <NoticeBox
            key={index}
            id={notice.id}
            category={notice.category}
            title={notice.title}
            content={notice.content}
            toDetail={() => navigate(`/notice/${notice.id}`)}
          />
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
          {filtercategorys.map((category) => (
            <span
              key={category}
              onClick={() => setFilter(category)}
              className={`cursor-pointer ${filter === category ? "active" : ""}`}
            >
              {category}
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
