import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getUsersAPI } from '../../api/api';

const initialState = {
  users: [],
  isFetching: false,
  error: null,
};

export const getUserThunk = createAsyncThunk(
  'users/getUsers',
  async (payload, thunkAPI) => {
    try {
      const { data } = await getUsersAPI();
      return data.results[0];
    } catch (err) {
      return thunkAPI.rejectWithValue({ message: err.message });
    }
  }
);

const userSlice = createSlice({
  initialState,
  name: 'users',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUserThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getUserThunk.fulfilled, (state, { payload }) => {
      state.users = payload;
      state.isFetching = false;
    });
    builder.addCase(getUserThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });
  },
});

export const { reducer, actions } = userSlice;
export default reducer;
