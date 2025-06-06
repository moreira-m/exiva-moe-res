import React from 'react';

const Header = ({ title = 'My App', children }) => (
  <header className="h-[70px] w-full border-b border-[#D291BC] bg-[#1A1A2E] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
    <select>
      <option>Hunt</option>
      <option>Boss</option>
    </select>
    <nav className="navbar">
      <button type="button">Home</button>
      <button type="button">About</button>
      <button type="button">Contact</button>
      {children}
    </nav>
  </header>
);

export default Header;
