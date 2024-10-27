import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FiltersState {
  gender: string;
  hair_color: string;
  skin_color: string;
  homeworld: string;
  searchTerm: string;
  director: string;
  producer: string;
  climate: string;
  terrain: string;
  starship_class: string;
  manufacturer: string;
}

const initialState: FiltersState = {
  gender: '',
  hair_color: '',
  skin_color: '',
  homeworld: '',
  searchTerm: '',
  director: '',
  producer: '',
  climate: '',
  terrain: '',
  starship_class: '',
  manufacturer: '',
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{ key: keyof FiltersState; value: string }>
    ) => {
      state[action.payload.key] = action.payload.value;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    clearFilters: (state) => {
      return initialState;
    },
  },
});

export const { setFilter, setSearchTerm, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
