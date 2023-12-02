import { useRef } from 'react';

interface CountryAutocompleteProps {
  countryRef: React.RefObject<HTMLInputElement>;
}

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

const CountryAutocomplete: React.FC<CountryAutocompleteProps> = () => {
  const countryRef = useRef<HTMLInputElement>(null);

  const getFilteredCountries = () => {
    if (!countryRef.current) return [];
    const userInput = countryRef.current.value;
    return countries.filter((country) =>
      country.toLowerCase().includes(userInput.toLowerCase())
    );
  };

  return (
    <>
      <input
        className="block w-full px-4 py-2 bg-gray-500 text-white border border-white rounded-md shadow-sm placeholder-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
        ref={countryRef}
        type="text"
        list="country-list"
        autoComplete="off"
        placeholder="Country"
      />
      <datalist id="country-list">
        {getFilteredCountries().map((country, index) => (
          <option key={index} value={country} />
        ))}
      </datalist>
    </>
  );
};

export default CountryAutocomplete;
