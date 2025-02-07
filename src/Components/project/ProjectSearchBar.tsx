import { FaPlus, FaSearch, FaSearchengin } from 'react-icons/fa';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Link } from 'react-router-dom';
import { Filter } from '@/src/Types/ProjectType';
import { FaX } from 'react-icons/fa6';
import { useState } from 'react';

interface ProjectSearchBarProps {
  filter: Filter;
  setFilter: (filter: Filter) => void;
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
}
const ProjectSearchBar = ({
  filter,
  setFilter,
  setSearchQuery,
  searchQuery,
}: ProjectSearchBarProps) => {
  const filters = {
    default: '모든 프로젝트',
    team: '그룹 프로젝트',
    personal: '개인 프로젝트',
    my: '내 프로젝트',
  };

  const [buffer, setBuffer] = useState('');

  return (
    <div
      className={
        'relative w-[calc(100%-24px)] sm:w-4/5 sm:px-0 h-12 flex justify-between border-b pb-2 mb-2'
      }
    >
      <div className={'h-9 flex relative w-1/3 gap-3'}>
        <div
          className={
            'flex items-center relative border border-gray-300 rounded-md overflow-hidden '
          }
        >
          <FaSearch size={20} color={'gray'} className={'w-10 text-xl px-2 '} />
          <input
            className={'flex-1 focus:outline-none'}
            type={'text'}
            placeholder={'태그로 검색'}
            onChange={(e) => setBuffer(e.target.value)}
            value={buffer}
          />
          {buffer && (
            <button
              className={'absolute right-2'}
              onClick={() => {
                setBuffer('');
                setSearchQuery('');
              }}
            >
              <FaX color={'gray'} size={12} />
            </button>
          )}
        </div>
        {buffer && (
          <button
            className={
              'h-9 flex items-center gap-2 px-3 py-1 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 transition-colors duration-200 shadow-sm'
            }
            onClick={() => setSearchQuery(buffer)}
          >
            <FaSearch />
            <span className={'hidden sm:block'}>검색</span>
          </button>
        )}
      </div>
      <div className={'flex items-center gap-2'}>
        <Select onValueChange={setFilter} defaultValue='default' value={filter}>
          <SelectTrigger className='max-w-[180px]'>
            <SelectValue placeholder='필터 선택' />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(filters).map(([value, label]) => (
              <SelectItem value={value}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Link
          to={'/project/edit'}
          className='h-9 flex items-center gap-2 px-3 py-1 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 transition-colors duration-200 shadow-sm'
        >
          <FaPlus className='w-4 h-4' />
          <span className={'text-nowrap hidden sm:block'}>새 프로젝트</span>
        </Link>
      </div>
    </div>
  );
};

export default ProjectSearchBar;
