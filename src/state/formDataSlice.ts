import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface FormState {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword?: string;
  gender: string;
  terms?: boolean;
  picture: string;
  country: string;
}

const initialState: FormState = {
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

export const formSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setFormData: (
      state,
      {
        payload: {
          name,
          age,
          email,
          password,
          confirmPassword,
          gender,
          terms,
          picture,
          country,
        },
      }: PayloadAction<FormState>
    ) => {
      state.name = name;
      state.age = age;
      state.email = email;
      state.password = password;
      state.confirmPassword = confirmPassword;
      state.gender = gender;
      state.terms = terms;
      state.picture = picture;
      state.country = country;
    },
  },
});

export const { setFormData } = formSlice.actions;

export const selectFormData = (state: RootState) => state.formData;

export default formSlice.reducer;
