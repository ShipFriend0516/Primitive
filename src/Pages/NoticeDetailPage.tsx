import { Link, useParams } from "react-router-dom";
import Footer from "../Components/common/Footer";
import NavBar from "../Components/common/NavBar";
import { useEffect, useState } from "react";
import Notice from "../Types/NoticeType";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import LoadingCircle from "../Components/LoadingCircle";
import { FaLongArrowAltLeft } from "react-icons/fa";

const NoticeDetailPage = () => {
  const { id } = useParams();
  console.log(id);
  // 실제 구현에서는 ID를 기반으로 공지사항을 가져와야 합니다.

  // 상태관리

  const [notice, setNotice] = useState<Notice>();
  const [noticeLoading, setNoticeLoading] = useState(true);

  // Effect
  useEffect(() => {
    getNoticeDetail();
  }, [id]);

  // Method
  const getNoticeDetail = async () => {
    try {
      const docRef = doc(db, "notices", id!);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = {
          id: docSnap.id,
          ...(docSnap.data() as Omit<Notice, "id">),
        };
        setNotice(data);
        setNoticeLoading(false);
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex flex-col min-h-screen  justify-between bg-white text-black">
      <NavBar />
      {!noticeLoading && notice ? (
        <div className="relative mt-10 md:mt-20 max-w-6xl mx-auto w-full flex-grow flex flex-col items-stretch p-5 md:p-10 gap-2">
          <span className="text-gray-500">{notice.category}</span>
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4">{notice.title}</h1>
          <p className="text-gray-600 mb-2">
            {notice.date ? new Date(notice.date.toDate()).toLocaleString() : "알 수 없음"}
          </p>
          <hr className="my-8" />
          <div className="prose max-w-none pb-20 whitespace-pre-wrap">
            <p>{notice.content}</p>
          </div>
          <Link
            to="/notice"
            className="inline-flex mt-8 text-black hover:underline font-bold  items-center gap-2"
          >
            <FaLongArrowAltLeft size={20} />
            목록으로
          </Link>
        </div>
      ) : (
        <div>
          <LoadingCircle />
        </div>
      )}
      <Footer />
    </section>
  );
};

export default NoticeDetailPage;
