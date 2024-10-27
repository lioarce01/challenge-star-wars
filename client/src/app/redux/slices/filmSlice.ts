import { Film } from '@/types/film';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilmState {
  films: Film[];
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
}

const initialState: FilmState = {
  films: [],
  totalCount: 0,
  currentPage: 1,
  itemsPerPage: 9,
};

export const filmSlice = createSlice({
  name: 'film',
  initialState,
  reducers: {
    setFilm: (state, action: PayloadAction<Film[]>) => {
      state.films = action.payload;
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1;
    },
  },
});

export const { setFilm, setTotalCount, setCurrentPage, setItemsPerPage } =
  filmSlice.actions;
export default filmSlice.reducer;
