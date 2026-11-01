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
  reducers: {},
});

export const { reducer, actions } = taskSlices;
export default reducer;
