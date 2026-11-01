import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  tasks: [
    {
      id: uuidv4(),
      isDone: false,
      text: 'Test',
      deadline: '2026-11-01',
    },
    { id: uuidv4(), isDone: false, text: 'Test2', deadline: '2026-12-01' },
  ],
};

const taskSlices = createSlice({
  initialState,
  name: 'tasks',
  reducers: {
    deleteTask: (state, { payload }) => {
      state.tasks = state.tasks.filter(t => t.id !== payload);
    },
    createTask: (state, { payload }) => {
      state.tasks.push({ ...payload, isDone: false, id: uuidv4() });
    },
    toggleTaskStatus: (state, { payload }) => {
      const task = state.tasks.find(t => t.id === payload);
      if (task) {
        task.isDone = !task.isDone;
      }
    },
  },
});

export const { reducer, actions } = taskSlices;
export const { deleteTask, createTask, toggleTaskStatus } = actions;
export default reducer;
