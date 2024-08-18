interface NoticeProps {
  kind: string;
  title: string;
  content: string;
}

const NoticeBox = ({ kind, title, content }: NoticeProps) => {
  return (
    <div className="flex border-t  py-6">
      <span className="mx-4 w-20">{kind}</span>
      <h2 className="text-xl">{title}</h2>
      <p>{content}</p>
    </div>
  );
};

export default NoticeBox;
