import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UncontrolledForm from './components/UncontrolledForm';
import ControlledForm from './components/ControlledForm';
import MainPage from './components/MainPage';

function App() {
  return (
    <Router basename="/react-rsschool">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
        <Route path="/controlled-form" element={<ControlledForm />} />
      </Routes>
    </Router>
  );
}

export default App;
