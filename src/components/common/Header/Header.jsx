import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoginPopup from './LoginPopup';

const navLinks = [
];

const Header = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const location = useLocation();

  const handleLoginClick = () => {
    setShowLoginPopup(true);
    setMenuOpen(false);
  };

  return (
    <header className="h-[70px] w-full border-b border-[#613C4C] bg-[#2B2C30] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex items-center justify-between px-6">
      <div className='max-w-screen-lg flex items-center justify-between w-full m-auto'>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-[#FFF] font-bold text-xl hover:text-[#613C4C] transition">
            Exiva Moe Res
          </Link>
        </div>


        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-white hover:text-[#613C4C] transition ${location.pathname === link.path ? 'font-bold underline' : ''
                }`}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={handleLoginClick}
            className="text-white hover:text-[#613C4C] transition bg-[#BF6370] px-4 py-2 rounded"
          >
            Login
          </button>
          {children}
        </nav>

        <button
          className="md:hidden text-[#613C4C] focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {menuOpen && (
          <div className="absolute top-[70px] left-0 w-full bg-[#2B2C30] flex flex-col items-center gap-4 py-4 md:hidden z-50 shadow-lg">
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-white hover:text-[#613C4C] text-lg ${location.pathname === link.path ? 'font-bold underline' : ''
                  }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={handleLoginClick}
              className="text-white hover:text-[#613C4C] text-lg"
            >
              Login
            </button>
            {children}
          </div>
        )}
      </div>

      {showLoginPopup && (
        <LoginPopup onClose={() => setShowLoginPopup(false)} />
      )}
    </header>
  );
};

export default Header;
