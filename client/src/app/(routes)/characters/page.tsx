'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetFilterValuesQuery,
  useGetPeoplesQuery,
} from '../../redux/api/people';
import {
  setPeople,
  setCurrentPage,
  setItemsPerPage,
} from '../../redux/slices/peopleSlice';
import { RootState, AppDispatch } from '../../redux/store/store';
import { People } from '@/types/people';
import Pagination from '../../components/Pagination';
import CharacterList from './CharacterList';
import FilterForm from './FilterForm';

export default function CharactersPage() {
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

  useEffect(() => {
    if (data) {
      dispatch(setPeople(data.results));
      dispatch({ type: 'people/setTotalCount', payload: data.count });
    }
  }, [data, dispatch]);

  const filteredPeople = people?.filter((character: People) =>
    character.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
  );

  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
  };
  return (
    <div className="min-h-screen text-white pt-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div>
          <div className="text-white px-8 bg-opacity-10">
            {/* Filters */}
            <FilterForm filterValues={filterValues} />

            {/* Char Card */}
            <CharacterList
              characters={filteredPeople}
              isLoading={isLoading}
              isFetching={isFetching}
              error={error}
            />

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(totalCount / itemsPerPage)}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={(value) => dispatch(setItemsPerPage(value))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
