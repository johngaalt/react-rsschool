import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UncontrolledFormState {
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
      }: PayloadAction<UncontrolledFormState>
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

export const { setFormData } = uncontrolledFormSlice.actions;

export default uncontrolledFormSlice.reducer;
