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
import { FilterValues } from '@/types/filter';

const CharactersPage = () => {
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
  }, [data, dispatch, currentPage]);

  const filteredPeople = people?.filter((character: People) =>
    character.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
  );

  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
  };
  return (
    <div className="relative min-h-screen text-white pt-16">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-50"
        src="/character.mp4"
        autoPlay
        loop
        muted
      ></video>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div>
          <div className="text-white px-8 bg-opacity-10">
            {/* Filters */}
            <FilterForm filterValues={filterValues as FilterValues} />

            {/* Char Card */}
            <CharacterList
              characters={filteredPeople}
              isLoading={isLoading}
              isFetching={isFetching}
              error={error as Error}
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
};

export default CharactersPage;
