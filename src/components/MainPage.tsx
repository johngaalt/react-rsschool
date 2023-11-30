import { Link } from 'react-router-dom';

export default function MainPage() {
  return (
    <div>
      <h1>Main Page</h1>
      <nav>
        <Link to="/uncontrolled-form">Uncontrolled Form</Link> |{' '}
        <Link to="/controlled-form">Controlled Form</Link>
      </nav>
    </div>
  );
}
