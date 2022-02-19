import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './routes/Home';
import Dashboard from './routes/Dashboard';
import Login from './routes/Login.js';
import Register from './routes/Register';
import { AuthProvider } from './context/AuthContext';
// import { AuthProvider } from './auth';

export default function App() {
  console.log(process.env.REACT_APP_API_URL);

  return (
    <AuthProvider>
      <div className="container">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/registreren" exact element={<Register />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}
