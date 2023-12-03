import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UncontrolledFormState {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  terms: boolean;
  picture: string;
  country: string;
}

const initialState: UncontrolledFormState = {
  name: '',
  age: 0,
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  terms: false,
  picture: '',
  country: '',
};

export const uncontrolledFormSlice = createSlice({
  name: 'uncontrolledFormData',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      state.age = parseInt(action.payload, 10);
      state.email = action.payload;
      state.password = action.payload;
      state.confirmPassword = action.payload;
      state.gender = action.payload;
      state.terms = action.payload === 'true';
      state.picture = action.payload;
      state.country = action.payload;
    },
  },
});

export const { setFormData } = uncontrolledFormSlice.actions;

export default uncontrolledFormSlice.reducer;
