import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { SuggestedProvider } from './components/SuggestedContext';
import './global.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // íconos Bootstrap


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SuggestedProvider>
      <App />
    </SuggestedProvider>
  </StrictMode>
);