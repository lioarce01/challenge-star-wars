import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PeopleState {
  people: any[];
}

const initialState: PeopleState = {
  people: [],
};

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    setPeople: (state, action: PayloadAction<any[]>) => {
      state.people = action.payload;
    },
    clearPeople: (state) => {
      state.people = [];
    },
  },
});

export const { setPeople, clearPeople } = peopleSlice.actions;
export default peopleSlice.reducer;
