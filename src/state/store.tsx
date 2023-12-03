import { configureStore } from '@reduxjs/toolkit';
import uncontrolledFormSlice from './uncontrolledFormSlice';
import controlledFormSlice from './controlledFormSlice';

export const store = configureStore({
  reducer: {
    uncontrolledForm: uncontrolledFormSlice,
    controlledForm: controlledFormSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
