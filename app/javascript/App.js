import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import VolunteerPage from './pages/VolunteerPage';
import LeadPage from './pages/LeadPage';
import PrivateRoute from './PrivateRoute';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/VolunteerData"
          element={<PrivateRoute element={VolunteerPage} allowedRoles={['volunteer']} />}
        />
        <Route
          path="/LeadData"
          element={<PrivateRoute element={LeadPage} allowedRoles={['lead']} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
