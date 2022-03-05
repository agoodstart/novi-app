import React, { useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './routes/Home';
import Dashboard from './routes/Dashboard';
import Login from './routes/Login.js';
import Register from './routes/Register';
import Modal from './components/modal/Modal';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  console.log('App component rendered');
  const modalRef = useRef();
  
  return (
    <AuthProvider modalRef={modalRef}>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/registreren" exact element={<Register />} />      
          </Routes>
        </main>
      </BrowserRouter>
      <Modal ref={modalRef} />
    </AuthProvider>
  );
}
