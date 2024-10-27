'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetFilterValuesQuery,
  useGetPeoplesQuery,
} from '../redux/api/people';
import {
  setPeople,
  setCurrentPage,
  setItemsPerPage,
} from '../redux/slices/peopleSlice';
import { RootState, AppDispatch } from '../redux/store/store';
import Link from 'next/link';
import {
  ChevronRight,
  Search,
  User,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react';
import { People } from '@/types/people';
import {
  clearFilters,
  setFilter,
  setSearchTerm,
} from '../redux/slices/filterSlice';

const PeopleList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { people, totalCount, currentPage, itemsPerPage } = useSelector(
    (state: RootState) => state.peopleState
  );
  const filters = useSelector((state: RootState) => state.filters);

  const { data, error, isLoading, isFetching } = useGetPeoplesQuery({
    offset: (currentPage - 1) * itemsPerPage,
    limit: itemsPerPage,
    ...filters,
  });

  const { data: filterValues } = useGetFilterValuesQuery();
  console.log('filters:', filterValues);

  useEffect(() => {
    if (data) {
      dispatch(setPeople(data.results));
      dispatch({ type: 'people/setTotalCount', payload: data.count });
    }
  }, [data, dispatch]);

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

  const filteredPeople = people?.filter((character: People) =>
    character.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
  };

  return (
    <div className="text-white px-8 bg-opacity-10">
      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <div className="mb-6 relative flex w-auto justify-center">
          <input
            type="text"
            placeholder="Search characters..."
            value={filters.searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-full py-2 px-4 pl-12 focus:outline-none focus:border-yellow-500 transition-all duration-300"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <label className="flex flex-col">
            <span className="mb-2 text-sm font-medium text-gray-300">
              Gender:
            </span>
            <select
              name="gender"
              value={filters.gender}
              onChange={handleChange}
              className="bg-gray-700 text-white py-2 px-3 rounded-md border border-gray-600 focus:outline-none focus:border-yellow-500 transition-all duration-300"
            >
              <option value="">all</option>
              {filterValues?.genders.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col">
            <span className="mb-2 text-sm font-medium text-gray-300">
              Hair Color:
            </span>
            <select
              name="hair_color"
              value={filters.hair_color}
              onChange={handleChange}
              className="bg-gray-700 text-white py-2 px-3 rounded-md border border-gray-600 focus:outline-none focus:border-yellow-500 transition-all duration-300"
            >
              <option value="">all</option>
              {filterValues?.hairColors.map((hair_color) => (
                <option key={hair_color} value={hair_color}>
                  {hair_color}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col">
            <span className="mb-2 text-sm font-medium text-gray-300">
              Skin Colors:
            </span>
            <select
              name="skin_color"
              value={filters.skin_color}
              onChange={handleChange}
              className="bg-gray-700 text-white py-2 px-3 rounded-md border border-gray-600 focus:outline-none focus:border-yellow-500 transition-all duration-300"
            >
              <option value="">all</option>
              {filterValues?.skinColors.map((skinColors) => (
                <option key={skinColors} value={skinColors}>
                  {skinColors}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col">
            <span className="mb-2 text-sm font-medium text-gray-300">
              Homeworlds:
            </span>
            <select
              name="homeworld"
              value={filters.homeworld}
              onChange={handleChange}
              className="bg-gray-700 text-white py-2 px-3 rounded-md border border-gray-600 focus:outline-none focus:border-yellow-500 transition-all duration-300"
            >
              <option value="">all</option>
              {filterValues?.homeworlds.map((homeworld) => (
                <option key={homeworld} value={homeworld}>
                  {homeworld}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {(isLoading || isFetching) && (
          <div className="col-span-full flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400"></div>
          </div>
        )}
        {error && (
          <p className="col-span-full text-center text-red-500 text-xl">
            Error loading people.
          </p>
        )}
        {filteredPeople?.length === 0 && !isLoading && !isFetching && (
          <p className="col-span-full text-center text-xl">
            No characters found.
          </p>
        )}
        {filteredPeople?.map((character: People) => (
          <Link href={`/characters/${character.id}`} key={character.id}>
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 transform hover:scale-105">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-yellow-400">
                    {character.name}
                  </h2>
                  <User className="text-yellow-500" size={24} />
                </div>
                <div className="space-y-2 text-sm">
                  <p className="flex justify-between">
                    <span className="text-gray-400">Gender:</span>
                    <span>{character.gender}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-400">Hair Color:</span>
                    <span>{character.hair_color}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-400">Skin color:</span>
                    <span>{character.skin_color}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-400">Homeworld:</span>
                    <span>{character?.homeworld?.name}</span>
                  </p>
                </div>
              </div>
              <div className="bg-gray-700 px-6 py-2 flex justify-between items-center">
                <span className="text-sm font-medium text-yellow-400">
                  View Details
                </span>
                <ChevronRight size={20} className="text-yellow-500" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center items-center space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-full bg-gray-800 text-white disabled:opacity-50 hover:bg-gray-700 transition-colors duration-300"
        >
          <ChevronLeftIcon size={20} />
        </button>
        <span className="text-md">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-full bg-gray-800 text-white disabled:opacity-50 hover:bg-gray-700 transition-colors duration-300"
        >
          <ChevronRightIcon size={20} />
        </button>
        <select
          value={itemsPerPage}
          onChange={(e) => dispatch(setItemsPerPage(Number(e.target.value)))}
          className="bg-gray-800 text-white py-2 px-3 rounded-md border border-gray-600 focus:outline-none focus:border-yellow-500 transition-all duration-300"
        >
          <option value="9">9 per page</option>
          <option value="18">18 per page</option>
          <option value="36">36 per page</option>
        </select>
      </div>
    </div>
  );
};

export default PeopleList;
