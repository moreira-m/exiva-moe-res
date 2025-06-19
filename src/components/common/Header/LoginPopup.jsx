import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './../../../firebase'; 

const LoginPopup = ({ onClose }) => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Usuário logado:", user);
      localStorage.setItem("user", JSON.stringify(user));
      onClose();
    } catch (error) {
      console.error("Erro no login com Google:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center text-[#2B2C30]">Login</h2>

        <div className="text-center">
          <button
            onClick={handleGoogleLogin}
            className="border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-100 transition"
          >
            Entrar com Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
