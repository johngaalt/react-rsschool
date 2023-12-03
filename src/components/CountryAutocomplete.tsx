import { useRef } from 'react';
import ValidationMessage from './ValidationMessage';

interface CountryAutocompleteProps {
  countryRef?: React.RefObject<HTMLInputElement>;
  validationMessage?: string;
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

const CountryAutocomplete: React.FC<CountryAutocompleteProps> = ({
  validationMessage,
}) => {
  const countryRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={countryRef}
        className="block w-full px-4 py-2 bg-gray-500 text-white border border-white rounded-md shadow-sm placeholder-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
        type="text"
        list="country-list"
        autoComplete="off"
        placeholder="Country"
      />
      <datalist id="country-list">
        {countries.map((country, index) => (
          <option key={index} value={country} />
        ))}
      </datalist>
      <ValidationMessage message={validationMessage} />
    </>
  );
};

export default CountryAutocomplete;
