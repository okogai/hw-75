import { configureStore } from "@reduxjs/toolkit";
import { decodeReducer } from "../store/slices/decodeSlice.ts";

export const store = configureStore({
  reducer: {
    decode: decodeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
