import { createSlice } from '@reduxjs/toolkit';
import { fetchTasks, addTask, deleteTask, toggleCompleted } from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },

  extraReducers: builder => {
    builder.addCase(fetchTasks.pending, handlePending);
    builder.addCase(addTask.pending, handlePending);
    builder.addCase(deleteTask.pending, handlePending);
    builder.addCase(toggleCompleted.pending, handlePending);

    builder.addCase(fetchTasks.rejected, handleRejected);
    builder.addCase(addTask.rejected, handleRejected);
    builder.addCase(deleteTask.rejected, handleRejected);
    builder.addCase(toggleCompleted.rejected, handleRejected);

    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    });

    builder.addCase(addTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
    });

    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      const index = state.items.findIndex(
        task => task.id === action.payload.id
      );
      state.items.splice(index, 1);
    });

    builder.addCase(toggleCompleted.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      const index = state.items.findIndex(
        task => task.id === action.payload.id
      );
      state.items.splice(index, 1, action.payload);
    });
  },
});

export const tasksReducer = tasksSlice.reducer;

