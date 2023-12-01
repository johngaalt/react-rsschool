import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setFormData } from '../state/uncontrolledFormSlice';

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
        <input
          type="text"
          ref={inputRef}
          className="block w-full px-4 py-2 bg-gray-500 text-white border border-white rounded-md shadow-sm placeholder-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          placeholder="Enter text"
        />
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
