import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Props {
  id: string;
  name: string;
  intro: string;
}

const ProjectListCard = ({ id, name, intro }: Props) => {
  return (
    <Link
      to={`/project/${id}`}
      className="projectListCard w-full flex items-center justify-between p-3 border-b cursor-pointer hover:shadow-md transition"
    >
      <div className="flex flex-col">
        <h3 className="text-xl font-bold">{name}</h3>
        <p>{intro}</p>
      </div>
      <div>
        <div className="hoverShow bg-gray-100 rounded-md text-sm text-gray-600 p-2">
          <FaArrowCircleRight />
        </div>
      </div>
    </Link>
  );
};

export default ProjectListCard;
