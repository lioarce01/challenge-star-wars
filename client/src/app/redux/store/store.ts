import { configureStore } from '@reduxjs/toolkit';
import { peopleApi } from '../api/people';
import { starshipApi } from '../api/starship';
import { filmApi } from '../api/film';
import { planetApi } from '../api/planet';
import { audioSlice } from '../slices/audioSlice';
import peopleReducer from '../slices/peopleSlice';
import filtersReducer from '../slices/filterSlice';

export const store = configureStore({
  reducer: {
    [starshipApi.reducerPath]: starshipApi.reducer,
    [peopleApi.reducerPath]: peopleApi.reducer,
    [filmApi.reducerPath]: filmApi.reducer,
    [planetApi.reducerPath]: planetApi.reducer,
    audio: audioSlice.reducer,
    peopleState: peopleReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      peopleApi.middleware,
      starshipApi.middleware,
      filmApi.middleware,
      planetApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
