import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setFormData } from '../state/uncontrolledFormSlice';
import CountryAutocomplete from './CountryAutocomplete';
import { schema } from '../utils/validator';
import { useNavigate } from 'react-router-dom';

export default function UncontrolledForm() {
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
      gender: genderMaleRef.current?.checked
        ? 'male'
        : genderFemaleRef.current?.checked
          ? 'female'
          : '',
      terms: termsRef.current?.checked || false,
      picture: await toBase64(
        pictureRef.current?.files?.[0] || new File([], '')
      ),
      country: countryRef.current?.value || '',
    };

    try {
      // Convert form data to the appropriate structure for Yup validation
      const validFormData = await schema.validate(formData, {
        abortEarly: false, // Return all errors found
      });

      // If validation is successful
      dispatch(setFormData(JSON.stringify(validFormData)));

      navigate('/');
    } catch (validationErrors) {
      console.error(validationErrors);
    }
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex justify-between flex-col gap-2"
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
        <label htmlFor="confirm">
          <input
            type="password"
            ref={confirmRef}
            id="confirm"
            name="confirm"
            placeholder="Confirm password"
            className="block w-full px-4 py-2 bg-gray-500 text-white border border-white rounded-md shadow-sm placeholder-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          />
        </label>
        <label htmlFor="genderMale">
          <input
            type="radio"
            name="gender"
            id="genderMale"
            value="male"
            ref={genderMaleRef}
            className=""
          />
          <span className="ml-2 text-white">Male</span>
        </label>
        <label htmlFor="genderFemale">
          <input
            type="radio"
            name="gender"
            id="genderFemale"
            value="female"
            ref={genderFemaleRef}
            className=""
          />
          <span className="ml-2 text-white">Female</span>
        </label>
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
        <label htmlFor="picture">
          <input
            type="file"
            name="picture"
            id="picture"
            ref={pictureRef}
            className="block w-full px-4 py-2 bg-gray-500 text-white border border-white rounded-md shadow-sm placeholder-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          />
        </label>
        <CountryAutocomplete countryRef={countryRef} />
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
