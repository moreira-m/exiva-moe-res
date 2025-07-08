import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import useOutsideClick from '../../../hooks/useOutsideClick.js';

const UserProfileDropdown = ({ user, onLogout, onClose }) => {
  const ref = useRef(null);
  useOutsideClick(ref, () => onClose && onClose());

  if (!user) return null;

  return (
    <div ref={ref} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
      <p className="px-4 py-2 font-bold text-surface border-b border-gray-200 truncate">
        {user.displayName || user.email}
      </p>
      <Link
        to="/my-ads"
        onClick={() => onClose && onClose()}
        className="block px-4 py-2 text-surface hover:bg-gray-100"
      >
        Minhas Vagas
      </Link>
      <Link
        to="/my-applications"
        onClick={() => onClose && onClose()}
        className="block px-4 py-2 text-surface hover:bg-gray-100"
      >
        Minhas Aplicações
      </Link>
      <button
        onClick={onLogout}
        className="block w-full text-left px-4 py-2 text-white text-center border-2 border-solid w-fit mx-auto rounded-lg transition-all duration-500 bg-accent hover:bg-white hover:transition-all hover:duration-500 hover:text-accent hover:border-2 hover:border-transparent"
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfileDropdown;
