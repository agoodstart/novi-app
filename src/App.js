import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './routes/Home';
import Dashboard from './routes/Dashboard';
import Login from './routes/Login';
import Register from './routes/Register';

export default function App() {
  return (
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
  );
}
