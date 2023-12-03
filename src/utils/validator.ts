import * as yup from 'yup';
const emailPattern =
  /^[a-zA-Z0-9._%+-]{1}(?:[a-zA-Z0-9._%+-]*[^.])?@gmail\.com$/;

export const schema = yup
  .object({
    name: yup
      .string()
      .required('Name is required')
      .matches(/^[A-Z][a-z]+/, 'First letter must be uppercase'),
    age: yup
      .number()
      .positive('Age must be positive')
      .integer('Age must be an integer')
      .required('Age is required'),
    email: yup
      .string()
      .matches(
        emailPattern,
        'Email must be a valid Gmail address and end with @gmail.com'
      )
      .required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .matches(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}/,
        'Password must contain 8 characters, one uppercase, one lowercase, one number and one special character'
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match'),
    gender: yup.string().required('Gender is required'),
    terms: yup
      .boolean()
      .oneOf([true], 'You must accept the terms and conditions'),
    picture: yup
      .mixed()
      .required('Picture is required')
      .test('fileSize', 'The file is too large', (value: unknown) => {
        if (value instanceof FileList && value.length > 0) {
          const file = value[0];
          return file.size <= 1024 * 1024;
        }
        return false;
      })
      .test('fileType', 'Unsupported file format', (value: unknown) => {
        if (value instanceof FileList && value.length > 0) {
          const file = value[0];
          return ['image/jpeg', 'image/png'].includes(file.type);
        }
        return false;
      }),

    country: yup.string().required('Country is required'),
  })
  .required();
