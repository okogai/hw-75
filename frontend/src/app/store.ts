import { configureStore } from "@reduxjs/toolkit";
import { tvShowsReducer } from '../store/slices/tvShowsSlice.ts';

export const store = configureStore({
  reducer: {
    tvShows: tvShowsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
