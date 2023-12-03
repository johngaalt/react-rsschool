import { configureStore } from '@reduxjs/toolkit';
import formSlice from './formDataSlice';
import controlledFormSlice from './controlledFormSlice';

export const store = configureStore({
  reducer: {
    uncontrolledForm: formSlice,
    controlledForm: controlledFormSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
