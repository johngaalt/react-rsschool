import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ControlledFormState {
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

const initialState: ControlledFormState = {
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

export const controlledFormSlice = createSlice({
  name: 'controlledForm',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<ControlledFormState>) => {
      state.name = action.payload.name;
      state.age = action.payload.age;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.confirmPassword = action.payload.confirmPassword;
      state.gender = action.payload.gender;
      state.terms = action.payload.terms;
      state.picture = action.payload.picture;
      state.country = action.payload.country;
    },
  },
});

export const { setFormData } = controlledFormSlice.actions;

export default controlledFormSlice.reducer;
