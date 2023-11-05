import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center ">
      <h1>404 Not Found</h1>
      <Link to="/" className="text-red-800 text-3xl">
        Go Home
      </Link>
    </div>
  );
}
