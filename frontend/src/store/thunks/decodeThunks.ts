import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosAPI from '../../utils/axiosAPI.ts';
import { IMessage, IMessageFromAPI } from '../../types';

export const decodeMessageFetch = createAsyncThunk<IMessageFromAPI, IMessage>(
  'decode/decodeMessageFetch',
  async (message: IMessage) => {
    const encodeMessage = await AxiosAPI.post('decode', message);
    return encodeMessage.data;
  }
);

export const encodeMessageFetch = createAsyncThunk<IMessageFromAPI, IMessage>(
  'decode/encodeMessageFetch',
  async (message: IMessage) => {
    const encodeMessage = await AxiosAPI.post('encode', message);
    return encodeMessage.data;
  }
);