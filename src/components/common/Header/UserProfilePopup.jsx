import React, { useRef } from 'react';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { Link } from 'react-router-dom';

const UserProfilePopup = ({ user, onClose, onLogout }) => {
  const popupRef = useRef(null);
  useOnClickOutside(popupRef, onClose);
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div ref={popupRef} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm relative text-center">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-[#2B2C30]">Perfil</h2>
        {user.photoURL && (
          <img src={user.photoURL} alt="avatar" className="w-24 h-24 rounded-full mx-auto mb-4" />
        )}
        <p className="font-bold">{user.displayName || user.email}</p>
        <p className="text-sm text-gray-500 mb-4">{user.email}</p>
        <div className="flex flex-col gap-2 mb-4">
          <Link
            to="/my-ads"
            onClick={onClose}
            className="text-[#2B2C30] hover:underline"
          >
            Minhas Vagas
          </Link>
          <Link
            to="/my-applications"
            onClick={onClose}
            className="text-[#2B2C30] hover:underline"
          >
            Minhas Aplicações
          </Link>
        </div>
        <button
          onClick={onLogout}
          className="mt-2 bg-[#BF6370] text-white px-4 py-2 rounded w-full hover:bg-[#a94e5b] transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfilePopup;
