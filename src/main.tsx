import React from 'react';
import ReactDOM from 'react-dom/client';
import { PatientProvider } from './context/PatientContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PatientProvider>
      <App />
    </PatientProvider>
  </React.StrictMode>
);
