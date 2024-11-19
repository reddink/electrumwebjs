import { useState, useEffect } from 'react';

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Wallet from './pages/Wallet.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Settings from './pages/Settings.jsx';
import Navbar from './pages/Navbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import './App.css'

import {useAuth, AuthProvider} from './context/AuthContext.jsx';
import {ElectrumProvider} from './context/ElectrumContext.jsx';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
      <AuthProvider>
        <ElectrumProvider>
          <Router>
            <div className="App">
              <Navbar/>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route
                    path="/dashboard"
                    element={
                      <PrivateRoute>
                        <Dashboard/>
                      </PrivateRoute>
                    }
                />
                <Route path="/wallet" element={<Wallet/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/settings" element={<Settings/>}/>
              </Routes>
            </div>
          </Router>
        </ElectrumProvider>
      </AuthProvider>
  );
};

export default App
