import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/authContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');
    </style>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
