import {Link} from 'react-router-dom';
import {useAuth} from '../context/AuthContext.jsx';
import {FaCog} from 'react-icons/fa';
import React from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {
            user ? (
                <>
                  <li><Link to="/dashboard">DashBoard</Link></li>
                  <button onClick={logout}>Logout</button>
                </>
            ) : (
                <li><Link to="/login">Login</Link></li>
            )
          }
          <li><Link to="/wallet">Wallet</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/settings"><FaCog size='1em'/></Link></li>
        </ul>
      </nav>
  );
};

export default Navbar;
