import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UncontrolledFormState {
  data: string;
}

const initialState: UncontrolledFormState = {
  data: '',
};

export const uncontrolledFormSlice = createSlice({
  name: 'uncontrolledFormData',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<string>) => {
      state.data = action.payload;
    },
  },
});

export const { setFormData } = uncontrolledFormSlice.actions;

export default uncontrolledFormSlice.reducer;
