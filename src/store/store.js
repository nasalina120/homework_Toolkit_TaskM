import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../store/slice/taskSlice';
import userReducer from '../store/slice/userSlice';
const store = configureStore({
  reducer: {
    taskList: taskReducer,
    userList: userReducer,
  },
});

export default store;
