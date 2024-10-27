import { configureStore } from '@reduxjs/toolkit';
import { peopleApi } from '../api/people';
import { starshipApi } from '../api/starship';
import { filmApi } from '../api/film';
import { planetApi } from '../api/planet';
import { audioSlice } from '../slices/audioSlice';
import peopleReducer from '../slices/peopleSlice';
import filmReducer from '../slices/filmSlice';
import planetReducer from '../slices/planetSlice';
import starshipReducer from '../slices/starshipSlice';
import filtersReducer from '../slices/filterSlice';

export const store = configureStore({
  reducer: {
    [starshipApi.reducerPath]: starshipApi.reducer,
    [peopleApi.reducerPath]: peopleApi.reducer,
    [filmApi.reducerPath]: filmApi.reducer,
    [planetApi.reducerPath]: planetApi.reducer,
    audio: audioSlice.reducer,
    peopleState: peopleReducer,
    filmState: filmReducer,
    planetState: planetReducer,
    starshipState: starshipReducer,
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
