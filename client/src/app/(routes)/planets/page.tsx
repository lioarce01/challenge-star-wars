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

const PlanetPage = () => {
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
  }, [data, dispatch, currentPage]);

  const filteredPlanet = planets?.filter((planet: Planet) =>
    planet.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
  );

  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
  };
  return (
    <div className="relative min-h-screen text-white pt-16">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-50"
        src="/planet.mp4"
        autoPlay
        loop
        muted
      ></video>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div>
          <div className="text-white px-8 bg-opacity-10">
            {/* Filters */}
            <FilterForm filterValues={filterValues} />

            {/* Planet Card */}
            <PlanetList
              planets={filteredPlanet}
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

export default PlanetPage;
