import {Link} from 'react-router-dom';
import {useAuth} from '../context/AuthContext.jsx';
import {FaBars} from 'react-icons/fa';
import React, {useState} from 'react';

const Navbar = () => {
  const {user, logout} = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
      <nav className="fixed top-0 left-0 w-full bg-blue-500 text-white shadow-md z-50">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-xl font-bold">ReddCoin</h1>

          {/* Navigation Links */}
          <ul
              className={`transition-all duration-300 md:flex md:items-center md:space-x-4 
                      ${isOpen ? 'block' : 'hidden'} absolute md:static 
                      bg-blue-600 md:bg-transparent top-full md:top-auto right-0 w-auto md:w-auto`}
              style={{maxWidth: 'max-content'}}
          >
            <li><Link to="/" onClick={handleLinkClick}
                      className="block px-4 py-2 visited:text-white active:text-yellow-400 hover:bg-blue-700 md:hover:bg-transparent rounded">Home</Link>
            </li>
            {user ? (
                <>
                  <li><Link to="/dashboard" onClick={handleLinkClick}
                            className="block px-4 py-2 visited:text-white active:text-yellow-400 hover:bg-blue-700 md:hover:bg-transparent rounded">Dashboard</Link>
                  </li>
                  <button onClick={() => {
                    handleLinkClick();
                    logout();
                  }} className="block px-4 py-2 w-full text-left hover:bg-blue-700">Logout
                  </button>
                </>
            ) : (
                <li><Link to="/login" onClick={handleLinkClick}
                          className="block px-4 py-2 visited:text-white active:text-yellow-400 hover:bg-blue-700 md:hover:bg-transparent rounded">Login</Link>
                </li>
            )}
            <li><Link to="/wallet" onClick={handleLinkClick}
                      className="block px-4 py-2 visited:text-white active:text-yellow-400 hover:bg-blue-700 md:hover:bg-transparent rounded">Wallet</Link>
            </li>
            <li><Link to="/about" onClick={handleLinkClick}
                      className="block px-4 py-2 visited:text-white active:text-yellow-400 hover:bg-blue-700 md:hover:bg-transparent rounded">About</Link>
            </li>
            <li><Link to="/contact" onClick={handleLinkClick}
                      className="block px-4 py-2 visited:text-white active:text-yellow-400 hover:bg-blue-700 md:hover:bg-transparent rounded">Contact</Link>
            </li>
            <li><Link to="/settings" onClick={handleLinkClick}
                      className="block px-4 py-2 visited:text-white active:text-yellow-400 hover:bg-blue-700 md:hover:bg-transparent rounded">Settings</Link>
            </li>
          </ul>

          {/* Hamburger Icon for Mobile */}
          <button className="md:hidden text-white focus:outline-none"
                  onClick={() => setIsOpen(!isOpen)}>
            <FaBars size="1.5em"/>
          </button>
        </div>
      </nav>
  );
};

export default Navbar;
