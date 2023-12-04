import { configureStore } from '@reduxjs/toolkit';
import formSlice from './formDataSlice';

export const store = configureStore({
  reducer: {
    formData: formSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppSelector = typeof store.getState;
