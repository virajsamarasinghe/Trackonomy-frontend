import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'; // Ensure this is imported
import reportWebVitals from './reportWebVitals';
import './styles/globals.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router> {/* Only one Router here */}
      <App />
    </Router>
  </React.StrictMode>
);

reportWebVitals();