import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Handle unhandled promise rejections
// Handle unhandled promise rejections in the browser
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled Rejection at:', event.promise, 'reason:', event.reason);
  // Optionally, prevent default handling to avoid termination
  event.preventDefault();
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
