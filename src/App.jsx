import { useState, useEffect } from 'react';

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Wallet from './pages/Wallet.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Settings from './pages/Settings.jsx';
import Navbar from './pages/Navbar.jsx';
import './App.css'

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/wallet" element={<Wallet/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/settings" element={<Settings/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App
