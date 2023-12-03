import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the structure of the form's state
interface ControlledFormState {
  submittedData: {
    name: string;
    age: number;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
    terms: boolean;
    picture: string; // Base64 encoded string
    country: string;
  } | null; // Initially there is no submitted data
}

// This is the initial state of the form, before any data is submitted
const initialState: ControlledFormState = {
  submittedData: null,
};

// Define the slice
const controlledFormSlice = createSlice({
  name: 'controlledFormData',
  initialState,
  reducers: {
    // Action to store the submitted data
    submitFormData: (
      state,
      action: PayloadAction<ControlledFormState['submittedData']>
    ) => {
      state.submittedData = action.payload;
    },
    // Action to clear the submitted data
    clearFormData: (state) => {
      state.submittedData = null;
    },
  },
});

// Export the actions
export const { submitFormData, clearFormData } = controlledFormSlice.actions;

// Export the reducer
export default controlledFormSlice.reducer;
