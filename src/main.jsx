
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ Add this

import App from './App.jsx';
import './index.css';
import { ThemeProvider } from './contexts/ThemeContext.jsx';

if (
  location.pathname !== "/" &&
  !location.pathname.startsWith("/bahrain_fine_art/assets")
) {
  sessionStorage.redirect = location.pathname;
}


const redirectPath = sessionStorage.getItem("redirectPath");
if (redirectPath) {
  sessionStorage.removeItem("redirectPath");
  window.history.replaceState(null, "", redirectPath);
}



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/bahrain_fine_art"> {/* ✅ Add this wrapper */}
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);


