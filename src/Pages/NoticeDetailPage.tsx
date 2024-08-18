import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";

interface NoticeDetailProps {
  id: number;
}

const NoticeDetailPage = ({ id }: NoticeDetailProps) => {
  // 실제 구현에서는 ID를 기반으로 공지사항을 가져와야 합니다.
  const notice = {
    id: id,
    title: "네이버웍스 코어 비정기 업데이트 소식",
    date: "2024.08.05",
    content:
      "네이버웍스 코어 비정기 업데이트가 2024년 8월 6일(화)에 진행됩니다. 자세한 업데이트 사항은 아래 내용을 확인해 주시기 바랍니다.",
  };

  return (
    <section className="flex flex-col min-h-screen  justify-between bg-white text-black">
      <NavBar />
      <div className="relative mt-10 md:mt-20 max-w-6xl mx-auto w-full flex-grow flex flex-col items-stretch p-5 md:p-10 gap-2">
        <h1 className="text-3xl font-bold mb-2">{notice.title}</h1>
        <p className="text-gray-600 mb-6">{notice.date}</p>
        <div className="prose max-w-none">
          <p>{notice.content}</p>
        </div>
        <a href="/" className="inline-block mt-8 text-blue-600 hover:underline">
          목록으로
        </a>
      </div>
      <Footer />
    </section>
  );
};

export default NoticeDetailPage;
