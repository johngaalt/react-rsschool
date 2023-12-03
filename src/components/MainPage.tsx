import { Link } from 'react-router-dom';
import { useAppSelector } from '../state/hooks';
import { selectFormData } from '../state/formDataSlice';

export default function MainPage() {
  const formData = useAppSelector(selectFormData);
  return (
    <div className="text-white">
      <h1>Main Page</h1>
      <nav>
        <Link to="/uncontrolled-form">Uncontrolled Form</Link> |{' '}
        <Link to="/controlled-form">Controlled Form</Link>
      </nav>
      {Object.values(formData).every(Boolean) &&
        Object.entries(formData).map(([key, value]) =>
          key === 'picture' ? (
            <img key={key} src={value} width={100} />
          ) : (
            <p key={key}>
              {key}: {value}
            </p>
          )
        )}
    </div>
  );
}
