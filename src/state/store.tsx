import { configureStore } from '@reduxjs/toolkit';
import uncontrolledFormSlice from './uncontrolledFormSlice';

export const store = configureStore({
  reducer: {
    uncontrolledForm: uncontrolledFormSlice,
    // controlledForm: controlledFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
