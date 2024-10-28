'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFilm,
  setCurrentPage,
  setItemsPerPage,
} from '../../redux/slices/filmSlice';
import { RootState, AppDispatch } from '../../redux/store/store';
import { Film } from '@/types/film';
import Pagination from '../../components/Pagination';
import FilterForm from './FilterForm';
import {
  useGetFilmsQuery,
  useGetFilterValuesQuery,
} from '@/app/redux/api/film';
import FilmList from './FilmList';

export default function FilmsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { films, totalCount, currentPage, itemsPerPage } = useSelector(
    (state: RootState) => state.filmState
  );
  const filters = useSelector((state: RootState) => state.filters);

  const { data, error, isLoading, isFetching } = useGetFilmsQuery({
    offset: (currentPage - 1) * itemsPerPage,
    limit: itemsPerPage,
    ...filters,
  });

  const { data: filterValues } = useGetFilterValuesQuery();

  useEffect(() => {
    if (data) {
      dispatch(setFilm(data.results));
      dispatch({ type: 'film/setTotalCount', payload: data.count });
    }
  }, [data, dispatch, currentPage]);

  const filteredFilm = films?.filter((film: Film) =>
    film.title.toLowerCase().includes(filters.searchTerm.toLowerCase())
  );

  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
  };
  return (
    <div className="relative min-h-screen text-white pt-16">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-50"
        src="/film.mp4"
        autoPlay
        loop
        muted
      ></video>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div>
          <div className="text-white px-8 bg-opacity-10">
            {/* Filters */}
            <FilterForm filterValues={filterValues} />

            {/* Char Card */}
            <FilmList
              film={filteredFilm}
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
