'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetFilterValuesQuery,
  useGetStarshipsQuery,
} from '../../redux/api/starship';
import {
  setStarship,
  setCurrentPage,
  setItemsPerPage,
} from '../../redux/slices/starshipSlice';
import { RootState, AppDispatch } from '../../redux/store/store';
import Pagination from '../../components/Pagination';
import StarshipList from './StarshipList';
import FilterForm from './FilterForm';
import { Starship } from '@/types/starship';

export default function StarshipPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { starships, totalCount, currentPage, itemsPerPage } = useSelector(
    (state: RootState) => state.starshipState
  );
  const filters = useSelector((state: RootState) => state.filters);

  const { data, error, isLoading, isFetching } = useGetStarshipsQuery({
    offset: (currentPage - 1) * itemsPerPage,
    limit: itemsPerPage,
    ...filters,
  });

  const { data: filterValues } = useGetFilterValuesQuery();

  useEffect(() => {
    if (data) {
      dispatch(setStarship(data.results));
      dispatch({ type: 'starship/setTotalCount', payload: data.count });
    }
  }, [data, dispatch, currentPage]);

  const filteredStarship = starships?.filter((starship: Starship) =>
    starship.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
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
            <StarshipList
              starships={filteredStarship}
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
