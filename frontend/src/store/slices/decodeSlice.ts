import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { decodeMessageFetch, encodeMessageFetch } from '../thunks/decodeThunks.ts';
import { IMessageFromAPI } from '../../types';
import { RootState } from '../../app/store.ts';

interface decodeState {
  decodeMessage: string;
  encodedMessage: string;
  loading: boolean;
}

const initialState: decodeState = {
  decodeMessage: '',
  encodedMessage: '',
  loading: false
};

export const decodeMessageSelector = (state: RootState) => state.decode.decodeMessage;
export const encodeMessageSelector = (state: RootState) => state.decode.encodedMessage;

export const decodeSlice = createSlice({
  name: "decode",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(decodeMessageFetch.pending, (state) => {
        state.loading = true;
      })
      .addCase(decodeMessageFetch.fulfilled, (state, action: PayloadAction<IMessageFromAPI>) => {
        state.loading = false;
        state.encodedMessage = action.payload.message;
      })
      .addCase(decodeMessageFetch.rejected, (state) => {
        state.loading = false;
      })
      .addCase(encodeMessageFetch.pending, (state) => {
        state.loading = true;
      })
      .addCase(encodeMessageFetch.fulfilled, (state, action: PayloadAction<IMessageFromAPI>) => {
        state.loading = false;
        state.decodeMessage = action.payload.message;
      })
      .addCase(encodeMessageFetch.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const decodeReducer = decodeSlice.reducer;