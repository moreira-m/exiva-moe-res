import React from 'react';
import { Link } from 'react-router-dom';

const UserProfileDropdown = ({ user, onLogout }) => {
  if (!user) return null;

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
      <p className="px-4 py-2 font-bold text-[#2B2C30] border-b border-gray-200 truncate">
        {user.displayName || user.email}
      </p>
      <Link
        to="/my-ads"
        className="block px-4 py-2 text-[#2B2C30] hover:bg-gray-100"
      >
        Minhas Vagas
      </Link>
      <Link
        to="/my-applications"
        className="block px-4 py-2 text-[#2B2C30] hover:bg-gray-100"
      >
        Minhas Aplicações
      </Link>
      <button
        onClick={onLogout}
        className="block w-full text-left px-4 py-2 text-[#BF6370] hover:bg-gray-100"
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfileDropdown;
