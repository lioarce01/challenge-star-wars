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
import { FilterValues } from '@/types/filter';

const StarshipPage = () => {
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
    <div className="relative min-h-screen text-white pt-16">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-50"
        src="/starship.mp4"
        autoPlay
        loop
        muted
      ></video>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div>
          <div className="text-white px-8 bg-opacity-10">
            {/* Filters */}
            <FilterForm filterValues={filterValues as FilterValues} />

            {/* Starship Card */}
            <StarshipList
              starships={filteredStarship}
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

export default StarshipPage;
