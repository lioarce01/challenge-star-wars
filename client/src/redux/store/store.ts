import { configureStore } from '@reduxjs/toolkit';
import { peopleApi } from '../api/people';

export const store = configureStore({
  reducer: {
    [peopleApi.reducerPath]: peopleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(peopleApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
