import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todo/todoSlice';
import { todoApi } from './todo/todoApi';

const store = configureStore({
  reducer: {
    todo: todoReducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});

export default store;
