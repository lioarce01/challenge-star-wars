import { People } from '@/types/people';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PeopleState {
  people: People[];
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
}

const initialState: PeopleState = {
  people: [],
  totalCount: 0,
  currentPage: 1,
  itemsPerPage: 5,
};

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    setPeople: (state, action: PayloadAction<People[]>) => {
      state.people = action.payload;
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

export const { setPeople, setTotalCount, setCurrentPage, setItemsPerPage } =
  peopleSlice.actions;
export default peopleSlice.reducer;
