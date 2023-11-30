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
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} />
      <button type="submit">Submit</button>
    </form>
  );
}
