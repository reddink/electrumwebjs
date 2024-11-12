import { useState, useEffect } from 'react';

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Wallet from './pages/Wallet.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Settings from './pages/Settings.jsx';
import { FaCog } from 'react-icons/fa'; // React Icons for the gear icon
import { Tooltip as ReactTooltip} from 'react-tooltip'; // For tooltips
import './App.css'

const App = () => {
  return (
    <Router>
      <div className="App">
        <header>
          <Link to="/settings" data-tip="Settings"
                style={{position: 'absolute', top: 10, right: 10}}>
            <FaCog size={24}/>
          </Link>
          <ReactTooltip/>
        </header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/wallet">Wallet</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
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
