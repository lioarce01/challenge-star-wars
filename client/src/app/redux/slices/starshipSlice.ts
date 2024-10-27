import { Starship } from '@/types/starship';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StarshipState {
  starship: Starship[];
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
}

const initialState: StarshipState = {
  starship: [],
  totalCount: 0,
  currentPage: 1,
  itemsPerPage: 9,
};

export const starshipSlice = createSlice({
  name: 'starship',
  initialState,
  reducers: {
    setStarship: (state, action: PayloadAction<Starship[]>) => {
      state.starship = action.payload;
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

export const { setStarship, setTotalCount, setCurrentPage, setItemsPerPage } =
  starshipSlice.actions;
export default starshipSlice.reducer;
