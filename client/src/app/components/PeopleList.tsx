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
    <div className="min-h-screen bg-black text-white p-8">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-6 relative flex justify-center">
          <input
            type="text"
            placeholder="Search characters..."
            value={filters.searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            className="w-full max-w-md bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-4 pl-10 focus:outline-none focus:border-yellow-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <label className="flex items-center">
            <span className="mr-2">Gender:</span>
            <select
              name="gender"
              value={filters.gender}
              onChange={handleChange}
              className="bg-gray-800 py-1 px-2 rounded-md"
            >
              <option value="">all</option>
              {filterValues?.genders.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center">
            <span className="mr-2">Hair Color:</span>
            <select
              name="hair_color"
              value={filters.hair_color}
              onChange={handleChange}
              className="bg-gray-800 py-1 px-2 rounded-md"
            >
              <option value="">all</option>
              {filterValues?.hairColors.map((hair_color) => (
                <option key={hair_color} value={hair_color}>
                  {hair_color}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center">
            <span className="mr-2">Skin Colors:</span>
            <select
              name="skin_color"
              value={filters.skin_color}
              onChange={handleChange}
              className="bg-gray-800 py-1 px-2 rounded-md"
            >
              <option value="">all</option>
              {filterValues?.skinColors.map((skinColors) => (
                <option key={skinColors} value={skinColors}>
                  {skinColors}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center">
            <span className="mr-2">Homeworlds</span>
            <select
              name="homeworld"
              value={filters.homeworlds}
              onChange={handleChange}
              className="bg-gray-800 py-1 px-2 rounded-md"
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
        <div className="mt-4 flex justify-center space-x-4">
          <button
            type="button"
            onClick={() => dispatch(clearFilters())}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {(isLoading || isFetching) && (
          <p className="text-center col-span-full">Loading...</p>
        )}
        {error && (
          <p className="text-center col-span-full text-red-500">
            Error loading people.
          </p>
        )}
        {filteredPeople?.length === 0 && !isLoading && !isFetching && (
          <p className="text-center col-span-full">No characters found.</p>
        )}
        {filteredPeople?.map((character: People) => (
          <Link href={`/characters/${character.id}`} key={character.id}>
            <div className="bg-gray-800 rounded-md overflow-hidden shadow-lg hover:shadow-yellow-500/20 transition-shadow duration-300 cursor-pointer">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold">{character.name}</h2>
                  <User className="text-yellow-500" size={24} />
                </div>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-gray-400">Gender:</span>{' '}
                    {character.gender}
                  </p>
                  <p>
                    <span className="text-gray-400">Birth Year:</span>{' '}
                    {character.birth_year}
                  </p>
                  <p>
                    <span className="text-gray-400">Height:</span>{' '}
                    {character.height} cm
                  </p>
                  <p>
                    <span className="text-gray-400">Mass:</span>{' '}
                    {character.mass} kg
                  </p>
                </div>
              </div>
              <div className="bg-gray-700 px-6 py-3 flex justify-between items-center">
                <span className="text-sm font-medium">View Details</span>
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
          className="p-2 rounded-full bg-gray-800 text-white disabled:opacity-50"
        >
          <ChevronLeftIcon size={20} />
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-full bg-gray-800 text-white disabled:opacity-50"
        >
          <ChevronRightIcon size={20} />
        </button>
        <select
          value={itemsPerPage}
          onChange={(e) => dispatch(setItemsPerPage(Number(e.target.value)))}
          className="bg-gray-800 text-white py-1 px-2 rounded-md"
        >
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
        </select>
      </div>
    </div>
  );
};

export default PeopleList;
