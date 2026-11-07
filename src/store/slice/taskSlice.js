import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import * as API from '../../api/api';

const initialState = {
  tasks: [],
  isFetching: false,
  error: null,
};

export const getTasksThunk = createAsyncThunk(
  'tasks/getTasks',
  async (payload, thunkAPI) => {
    try {
      const { data } = await API.getTasks();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ message: err.message });
    }
  }
);

const taskSlice = createSlice({
  initialState,
  name: 'tasks',
  reducers: {
    deleteTask: (state, { payload }) => {
      state.tasks = state.tasks.filter(t => t.id !== payload);
    },

    createTask: (state, { payload }) => {
      state.tasks.push({ ...payload, completed: false, id: uuidv4() });
    },
    toggleTaskStatus: (state, { payload }) => {
      const task = state.tasks.find(t => t.id === payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(getTasksThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getTasksThunk.fulfilled, (state, { payload }) => {
      state.tasks = payload;
      state.isFetching = false;
    });
    builder.addCase(getTasksThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });
  },
});

export const { reducer, actions } = taskSlice;
export const { deleteTask, createTask, toggleTaskStatus } = actions;
export default reducer;
