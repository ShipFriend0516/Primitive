import { FaPlus, FaSearch } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";

const ProjectSearchBar = () => {
  const filters = {
    default: "모든 프로젝트",
    recent: "최근 업데이트",
    starred: "즐겨찾기",
    my: "내 프로젝트",
  };

  return (
    <div
      className={"relative w-4/5 h-12 flex justify-between border-b pb-2 mb-2"}
    >
      <div
        className={
          "flex items-center relative w-1/3 border border-gray-300 rounded-md overflow-hidden"
        }
      >
        <FaSearch size={20} color={"gray"} className={"w-10 text-xl px-2 "} />
        <input
          className={"flex-1 focus:outline-none"}
          type={"text"}
          placeholder={"프로젝트 검색"}
        />
      </div>
      <div className={"flex items-center gap-2"}>
        <Select defaultValue="default">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="필터 선택" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(filters).map(([value, label]) => (<SelectItem value={value}>{label}</SelectItem>))}
          </SelectContent>
        </Select>
        <Link
          to={"/project/edit"}
          className="h-full flex items-center gap-2 px-2 py-1 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 transition-colors duration-200 shadow-sm"
        >
          <FaPlus className="w-4 h-4" />새 프로젝트
        </Link>
      </div>
    </div>
  );
};

export default ProjectSearchBar