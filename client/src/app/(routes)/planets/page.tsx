'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetFilterValuesQuery,
  useGetPlanetsQuery,
} from '../../redux/api/planet';
import {
  setCurrentPage,
  setItemsPerPage,
} from '../../redux/slices/planetSlice';
import { RootState, AppDispatch } from '../../redux/store/store';
import Pagination from '../../components/Pagination';
import PlanetList from './PlanetList';
import FilterForm from './FilterForm';
import { Planet } from '@/types/planet';
import { setPlanet } from '@/app/redux/slices/planetSlice';

export default function PlanetPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { planets, totalCount, currentPage, itemsPerPage } = useSelector(
    (state: RootState) => state.planetState
  );
  const filters = useSelector((state: RootState) => state.filters);

  const { data, error, isLoading, isFetching } = useGetPlanetsQuery({
    offset: (currentPage - 1) * itemsPerPage,
    limit: itemsPerPage,
    ...filters,
  });

  const { data: filterValues } = useGetFilterValuesQuery();

  useEffect(() => {
    if (data) {
      dispatch(setPlanet(data.results));
      dispatch({ type: 'planet/setTotalCount', payload: data.count });
    }
  }, [data, dispatch]);

  const filteredPlanet = planets?.filter((planet: Planet) =>
    planet.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
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
            <PlanetList
              planets={filteredPlanet}
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
