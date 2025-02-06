import { Filter } from "@/src/Types/ProjectType";

interface FilterContainerProps {
  filter: Filter;
  setFilter: (filter: Filter) => void;
  tagFilter: string;
  setTagFilter: (filter: string) => void;
}
const FilterContainer = ({
  filter,
  setFilter,
  tagFilter,
  setTagFilter,
}: FilterContainerProps) => {
  const filters = ["personal", "team"];

  return (
    <>
      <div
        id="filterGroup"
        className="w-full justify-center relative flex flex-wrap max-w-full gap-1 mb-5"
      >
        <div
          onClick={() => setFilter("default")}
          className={`${filter === "default" && "selected"}`}
        >
          전체
        </div>
        {filters.map((kind) => (
          <div
            key={kind}
            onClick={() => setFilter(kind as Filter)}
            className={`${filter === kind && "selected"}`}
          >
            {kind.toUpperCase()[0].concat(kind.slice(1))}
          </div>
        ))}
      </div>
      <div className="w-4/5 inline-flex justify-end items-center">
        {tagFilter && (
          <div onClick={() => setTagFilter("")}>
            <span className="tag px-1.5 py-0.5">{tagFilter}</span>로 검색 중...
          </div>
        )}
      </div>
    </>
  );
};

export default FilterContainer;
