import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import App from './App';
import RegistrationPage from './RegistrationPage';

function RouteApp() {
  return (
    <React.Fragment>
      <main>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/form/" element={<RegistrationPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default RouteApp;