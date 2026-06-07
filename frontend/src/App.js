import './App.css';
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './auth/KeycloakProvider';
import CustomerPage from './pages/CustomerPage';
import LandingPage from './pages/LandingPage';
import CreateCustomerPage from './pages/CreateCustomerPage';

function App() {
  const { authenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        
        <Route 
          path="/" 
          element={authenticated ? <Navigate to="/customers" /> : <LandingPage />} 
        />
        <Route 
          path="/customers"
          element={authenticated ? <CustomerPage /> : <Navigate to="/" />}
        />
        <Route 
          path="/customers/new"
          element={authenticated ? <CreateCustomerPage /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
