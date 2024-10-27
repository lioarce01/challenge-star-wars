import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useDispatch } from 'react-redux';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  setItemsPerPage,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center items-center space-x-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-full bg-gray-800 text-white disabled:opacity-50 hover:bg-gray-700 transition-colors duration-300"
      >
        <ChevronLeftIcon size={20} />
      </button>
      <span className="text-md">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full bg-gray-800 text-white disabled:opacity-50 hover:bg-gray-700 transition-colors duration-300"
      >
        <ChevronRightIcon size={20} />
      </button>
      <select
        value={itemsPerPage}
        onChange={() => setItemsPerPage}
        className="bg-gray-800 text-white py-2 px-3 rounded-md border border-gray-600 focus:outline-none focus:border-yellow-500 transition-all duration-300"
      >
        <option value="9">9 per page</option>
        <option value="18">18 per page</option>
        <option value="36">36 per page</option>
      </select>
    </div>
  );
};

export default Pagination;
