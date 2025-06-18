import React from 'react';

const LoginPopup = ({ onClose }) => {
  const handleGoogleLogin = () => {
    alert("Login com Google ainda não implementado.");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    alert("Login ainda não implementado.");
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
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            className="px-4 py-2 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="bg-[#BF6370] text-white px-4 py-2 rounded hover:bg-[#a34e5a] transition"
          >
            Entrar
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm mb-2 text-gray-600">ou</p>
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
