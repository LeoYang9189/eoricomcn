import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import ApplicationList from './pages/ApplicationList';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/applications" element={<ApplicationList />} />
      </Routes>
    </AuthProvider>
  );
}

export default App; 