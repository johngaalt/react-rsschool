import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './state/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <div className="bg-gray-700 min-h-screen">
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </div>
);
