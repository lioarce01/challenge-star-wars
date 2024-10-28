'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFilter,
  setSearchTerm,
  clearFilters,
} from '../../redux/slices/filterSlice';
import { RootState } from '../../redux/store/store';
import { Search } from 'lucide-react';
import { FilterValues } from '@/types/filter';

type FilterFormProps = {
  filterValues: FilterValues;
};

const FilterForm: React.FC<FilterFormProps> = ({ filterValues }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    dispatch(
      setFilter({
        key: e.target.name as keyof typeof filters,
        value: e.target.value,
      })
    );
  };

  return (
    <form className="mb-8 bg-gray-800 bg-opacity-90 p-6 rounded-lg shadow-lg">
      <div className="mb-6 relative flex w-auto justify-center">
        <input
          type="text"
          placeholder="Search planets..."
          value={filters.searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          className="w-full bg-gray-700 text-white border border-gray-600 rounded-full py-2 px-4 pl-12 focus:outline-none focus:border-yellow-500 transition-all duration-300"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <label className="flex flex-col">
          <span className="mb-2 text-sm font-medium text-gray-300">
            Climate:
          </span>
          <select
            name="climate"
            value={filters.climate}
            onChange={handleChange}
            className="bg-gray-700 text-white py-2 px-3 rounded-md border border-gray-600 focus:outline-none focus:border-yellow-500 transition-all duration-300"
          >
            <option value="">all</option>
            {filterValues?.climate?.map((climate: string) => (
              <option key={climate} value={climate}>
                {climate}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col">
          <span className="mb-2 text-sm font-medium text-gray-300">
            Terrain:
          </span>
          <select
            name="terrain"
            value={filters.terrain}
            onChange={handleChange}
            className="bg-gray-700 text-white py-2 px-3 rounded-md border border-gray-600 focus:outline-none focus:border-yellow-500 transition-all duration-300"
          >
            <option value="">all</option>
            {filterValues?.terrain?.map((terrain: string) => (
              <option key={terrain} value={terrain}>
                {terrain}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => dispatch(clearFilters())}
          className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Clear Filters
        </button>
      </div>
    </form>
  );
};

export default FilterForm;
