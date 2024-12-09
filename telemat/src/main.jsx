import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QrCodeProvider } from './pages/QrCodeContext';
import './index.css';
import App from './App.jsx';
import { BrowserRouter as Router } from "react-router-dom";

// Create root and render the App wrapped with QrCodeProvider
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QrCodeProvider>
      <App />
    </QrCodeProvider>
  </StrictMode>
);


