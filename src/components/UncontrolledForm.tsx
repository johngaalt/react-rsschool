import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import CountryAutocomplete from './CountryAutocomplete';
import { schema } from '../utils/validator';
import { useNavigate } from 'react-router-dom';
import { ValidationError } from 'yup';
import ValidationMessage from './ValidationMessage';
import toBase64 from '../utils/toBase64';
import { FormState, setFormData } from '../state/formDataSlice';

const parseValidationErrors = (
  validationErrors: ValidationError
): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (validationErrors.inner) {
    validationErrors.inner.forEach((error) => {
      if (error.path && !errors[error.path]) {
        errors[error.path] = error.message;
      }
    });
  }

  return errors;
};

export default function UncontrolledForm() {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);
  const genderMaleRef = useRef<HTMLInputElement>(null);
  const genderFemaleRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = {
      name: nameRef.current?.value || '',
      age: parseInt(ageRef.current?.value || '0', 10),
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmRef.current?.value || '',
      // TODO: get rid of nested ternary
      gender: genderMaleRef.current?.checked
        ? 'male'
        : genderFemaleRef.current?.checked
          ? 'female'
          : '',
      terms: termsRef.current?.checked || false,
      picture: pictureRef.current?.files,
      country: countryRef.current?.value || '',
    };

    try {
      const validFormData = await schema.validate(formData, {
        abortEarly: false,
      });

      const payload: FormState = {
        name: validFormData.name,
        age: validFormData.age,
        email: validFormData.email,
        password: validFormData.password,
        confirmPassword: validFormData.confirmPassword,
        gender: validFormData.gender,
        terms: validFormData.terms,
        picture: await toBase64(validFormData.picture),
        country: validFormData.country,
      };

      dispatch(setFormData(payload));

      navigate('/');
    } catch (error) {
      const validationErrors = error as ValidationError;
      setValidationErrors(parseValidationErrors(validationErrors));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex justify-between flex-col gap-2"
        autoComplete="off"
      >
        <label htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            ref={nameRef}
            className="block w-full px-4 py-2 bg-gray-500 text-white border border-white rounded-md shadow-sm placeholder-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
            placeholder="Enter name"
          />
        </label>
        <ValidationMessage message={validationErrors.name} />
        <label htmlFor="age">
          <input
            type="number"
            ref={ageRef}
            id="age"
            name="age"
            placeholder="Enter age"
            className="block w-full px-4 py-2 bg-gray-500 text-white border border-white rounded-md shadow-sm placeholder-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          />
        </label>
        <ValidationMessage message={validationErrors.age} />
        <label htmlFor="email">
          <input
            type="email"
            ref={emailRef}
            id="email"
            name="email"
            placeholder="Enter email"
            className="block w-full px-4 py-2 bg-gray-500 text-white border border-white rounded-md shadow-sm placeholder-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          />
        </label>
        <ValidationMessage message={validationErrors.email} />
        <label htmlFor="password">
          <input
            type="password"
            ref={passwordRef}
            id="password"
            name="password"
            placeholder="Enter password"
            className="block w-full px-4 py-2 bg-gray-500 text-white border border-white rounded-md shadow-sm placeholder-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          />
        </label>
        <ValidationMessage message={validationErrors.password} />
        <label htmlFor="confirm">
          <input
            type="password"
            ref={confirmRef}
            id="confirm"
            name="confirmPassword"
            placeholder="Confirm password"
            className="block w-full px-4 py-2 bg-gray-500 text-white border border-white rounded-md shadow-sm placeholder-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          />
        </label>
        <ValidationMessage message={validationErrors.confirmPassword} />
        <div className="flex">
          <label htmlFor="genderMale">
            <input
              type="radio"
              name="gender"
              id="genderMale"
              value="male"
              ref={genderMaleRef}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-white">Male</span>
          </label>
          <label htmlFor="genderFemale" className="ml-4">
            <input
              type="radio"
              name="gender"
              id="genderFemale"
              value="female"
              ref={genderFemaleRef}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-white">Female</span>
          </label>
        </div>
        <ValidationMessage message={validationErrors.gender} />
        <label htmlFor="terms">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            ref={termsRef}
            className="mr-2"
          />
          <span className="text-white">
            I agree to the terms and conditions
          </span>
        </label>
        <ValidationMessage message={validationErrors.terms} />
        <label htmlFor="picture">
          <input
            type="file"
            name="picture"
            id="picture"
            ref={pictureRef}
            accept="image/jpeg, image/png"
            className="block w-full px-4 py-2 bg-gray-500 text-white border border-white rounded-md shadow-sm placeholder-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          />
        </label>
        <ValidationMessage message={validationErrors.picture} />
        <CountryAutocomplete
          countryRef={countryRef}
          validationMessage={validationErrors.country}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-md border-white hover:bg-gray-600 focus:outline-none focus:border-gray-700 focus:ring-2 focus:ring-gray-400"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
