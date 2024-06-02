import { createSlice } from '@reduxjs/toolkit';
export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    tasks: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.tasks.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.tasks = state.tasks.filter(task => task.mid !== action.payload);
    },
    viewTodo: (state, action) => {
      state.currentTask = state.tasks.find(task => task.mid === action.payload);
    },
    updateTodo: (state, action) => {
      const index = state.tasks.findIndex(task => task.mid === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, viewTodo } = todoSlice.actions;
export default todoSlice.reducer;
