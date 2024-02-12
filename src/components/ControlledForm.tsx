import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CountryAutocomplete from './CountryAutocomplete';
import ValidationMessage from './ValidationMessage';
import { ValidationSchemaKeys, schema } from '../utils/validator';

export default function ControlledForm() {
  // const dispatch = useDispatch();
  const {
    // register,
    handleSubmit,
    formState: { errors: validationErrors },
  } = useForm<ValidationSchemaKeys>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: ValidationSchemaKeys) => console.log(data);

  return (
    <>
      <h1>Controlled Form</h1>
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-between flex-col gap-2"
          autoComplete="off"
        >
          <label htmlFor="name">
            <input
              id="name"
              name="name"
              type="text"
              className="block w-full px-4 py-2 bg-gray-600 text-white border border-blue rounded-md shadow-sm placeholder-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
              placeholder="Enter name"
            />
          </label>
          <ValidationMessage message={validationErrors.name?.message} />
          <label htmlFor="age">
            <input
              type="number"
              id="age"
              name="age"
              placeholder="Enter age"
              className="block w-full px-4 py-2 bg-gray-600 text-white border border-blue rounded-md shadow-sm placeholder-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
            />
          </label>
          <ValidationMessage message={validationErrors.age?.message} />
          <label htmlFor="email">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              className="block w-full px-4 py-2 bg-gray-600 text-white border border-blue rounded-md shadow-sm placeholder-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
            />
          </label>
          <ValidationMessage message={validationErrors.email?.message} />
          <label htmlFor="password">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              className="block w-full px-4 py-2 bg-gray-600 text-white border border-blue rounded-md shadow-sm placeholder-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
            />
          </label>
          <ValidationMessage message={validationErrors.password?.message} />
          <label htmlFor="confirm">
            <input
              type="password"
              id="confirm"
              name="confirmPassword"
              placeholder="Confirm password"
              className="block w-full px-4 py-2 bg-gray-600 text-white border border-blue rounded-md shadow-sm placeholder-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
            />
          </label>
          <ValidationMessage
            message={validationErrors.confirmPassword?.message}
          />
          <div className="flex">
            <label htmlFor="genderMale">
              <input
                type="radio"
                name="gender"
                id="genderMale"
                value="male"
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
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-white">Female</span>
            </label>
          </div>
          <ValidationMessage message={validationErrors.gender?.message} />
          <label htmlFor="terms">
            <input type="checkbox" id="terms" name="terms" className="mr-2" />
            <span className="text-white">
              I agree to the terms and conditions
            </span>
          </label>
          <ValidationMessage message={validationErrors.terms?.message} />
          <label htmlFor="picture">
            <input
              type="file"
              name="picture"
              id="picture"
              accept="image/jpeg, image/png"
              className="block w-full px-4 py-2 bg-gray-600 text-white border border-blue rounded-md shadow-sm placeholder-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
            />
          </label>
          <ValidationMessage message={validationErrors.picture?.message} />
          <CountryAutocomplete
            validationMessage={validationErrors.country?.message}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-md border-blue hover:bg-gray-600 focus:outline-none focus:border-gray-700 focus:ring-2 focus:ring-gray-400"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
