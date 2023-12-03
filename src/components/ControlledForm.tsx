export default function ControlledForm() {
  // const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter name" />
      <input type="number" placeholder="Enter age" />
      <input type="email" placeholder="Enter email" />
      <input type="password" placeholder="Enter password" />
      <input type="password" placeholder="Confirm password" />
      <label>
        Male
        <input type="radio" name="gender" value="male" />
      </label>
      <label>
        Female
        <input type="radio" name="gender" value="female" />
      </label>
      <label>
        Accept Terms & Conditions
        <input type="checkbox" />
      </label>
      <label htmlFor="picture">
        <input
          type="file"
          name="picture"
          id="picture"
          className="block w-full px-4 py-2 bg-gray-500 text-white border border-white rounded-md shadow-sm placeholder-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
