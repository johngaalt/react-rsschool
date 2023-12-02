import { useRef } from 'react';

const countries = [
  'Turkiye',
  'Germany',
  'France',
  'Spain',
  'Italy',
  'United Kingdom',
  'United States',
  'Canada',
];

const CountryAutocomplete = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const getFilteredCountries = () => {
    if (!inputRef.current) return [];
    const userInput = inputRef.current.value;
    return countries.filter((country) =>
      country.toLowerCase().includes(userInput.toLowerCase())
    );
  };

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        list="country-list"
        autoComplete="off"
      />
      <datalist id="country-list">
        {getFilteredCountries().map((country, index) => (
          <option key={index} value={country} />
        ))}
      </datalist>
      <button type="submit">Submit</button>
    </>
  );
};

export default CountryAutocomplete;
