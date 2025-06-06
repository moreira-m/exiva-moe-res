import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const Header = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="h-[70px] w-full border-b border-[#D291BC] bg-[#1A1A2E] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex items-center justify-between px-6">
      <div className='max-w-screen-lg flex items-center justify-between w-full m-auto'>
        <div className="flex items-center gap-4">
          <select className="bg-[#22223B] text-white border-none rounded px-2 py-1">
            <option>Hunt</option>
            <option>Boss</option>
          </select>
          <span className="text-[#D291BC] font-bold text-xl">Exivinho</span>
        </div>


        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-white hover:text-[#D291BC] transition ${location.pathname === link.path ? 'font-bold underline' : ''
                }`}
            >
              {link.name}
            </Link>
          ))}
          {children}
        </nav>


        <button
          className="md:hidden text-[#D291BC] focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>


        {menuOpen && (
          <div className="absolute top-[70px] left-0 w-full bg-[#1A1A2E] flex flex-col items-center gap-4 py-4 md:hidden z-50 shadow-lg">
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-white hover:text-[#D291BC] text-lg ${location.pathname === link.path ? 'font-bold underline' : ''
                  }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {children}
          </div>
        )}
      </div>

    </header>
  );
};

export default Header;
