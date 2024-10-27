import { Planet } from '@/types/planet';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PlanetState {
  planet: Planet[];
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
}

const initialState: PlanetState = {
  planet: [],
  totalCount: 0,
  currentPage: 1,
  itemsPerPage: 9,
};

export const planetSlice = createSlice({
  name: 'planet',
  initialState,
  reducers: {
    setPlanet: (state, action: PayloadAction<Planet[]>) => {
      state.planet = action.payload;
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

export const { setPlanet, setTotalCount, setCurrentPage, setItemsPerPage } =
  planetSlice.actions;
export default planetSlice.reducer;
