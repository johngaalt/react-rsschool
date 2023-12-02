import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setFormData } from '../state/uncontrolledFormSlice';
import CountryAutocomplete from './CountryAutocomplete';

export default function UncontrolledForm() {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputRef.current) {
      dispatch(setFormData(inputRef.current.value));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="flex">
        <label htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            ref={inputRef}
            className="block w-full px-4 py-2 bg-gray-500 text-white border border-white rounded-md shadow-sm placeholder-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
            placeholder="Enter text"
          />
        </label>
        <label htmlFor="age">
          <input
            type="number"
            ref={inputRef}
            id="age"
            name="age"
            className="block w-full px-4 py-2 bg-gray-500 text-white border border-white rounded-md shadow-sm placeholder-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          />
        </label>
        <label htmlFor="email">
          <input
            type="email"
            ref={inputRef}
            id="email"
            name="email"
            placeholder="Enter email"
            className="block w-full px-4 py-2 bg-gray-500 text-white border border-white rounded-md shadow-sm placeholder-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            ref={inputRef}
            id="password"
            name="password"
            placeholder="Enter password"
            className="block w-full px-4 py-2 bg-gray-500 text-white border border-white rounded-md shadow-sm placeholder-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          />
        </label>
        <label htmlFor="confirm">
          <input
            type="password"
            ref={inputRef}
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
            ref={inputRef}
            className=""
          />
        </label>
        <label htmlFor="genderFemale">
          <input
            type="radio"
            name="gender"
            id="genderFemale"
            value="female"
            ref={inputRef}
            className=""
          />
        </label>
        <label htmlFor="terms">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            ref={inputRef}
            className="mr-2"
          />
        </label>
        <label htmlFor="picture">
          <input
            type="file"
            name="picture"
            id="picture"
            ref={inputRef}
            className="block w-full px-4 py-2 bg-gray-500 text-white border border-white rounded-md shadow-sm placeholder-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          />
        </label>
        <CountryAutocomplete />
        <button
          type="submit"
          className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 focus:outline-none focus:border-gray-700 focus:ring-2 focus:ring-gray-400"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
