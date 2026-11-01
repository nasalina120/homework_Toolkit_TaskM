import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../store/slice/taskSlice';

const store = configureStore({
  reducer: {
    TaskList: taskReducer,
  },
});

export default store;
