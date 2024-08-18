import Notice from "../Types/NoticeType";

interface NoticeType extends Notice {
  toDetail: () => void;
}

const NoticeBox = ({ id, category, title, content, toDetail }: NoticeType) => {
  return (
    <div onClick={toDetail} className="flex border-t py-6 cursor-pointer">
      <span className="mx-4 w-20">{category}</span>
      <h2 className="text-xl">{title}</h2>
      {/* <p>{content}</p> */}
    </div>
  );
};

export default NoticeBox;
