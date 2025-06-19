import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './../../../firebase';
import googleIcon from '../../../assets/google-icon.png'
import facebookIcon from '../../../assets/facebook-icon.png'

const LoginPopup = ({ onClose }) => {
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("Usuário logado:", user);
            localStorage.setItem("user", JSON.stringify(user));
            onClose();
        } catch (error) {
            console.error("Erro: ", error);
        }
    };

    const handleFacebookLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            localStorage.setItem("user", JSON.stringify(user));
        } catch (error) {
            console.error("Erro: ", error);
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

                <div className="text-center flex flex-col gap-4">
                    <div className='flex flex-row border rounded justify-center p-2 hover:bg-gray-100 transition'>
                        <img
                            src={googleIcon}
                            className='w-[33px] h-[33px]'
                        />
                        <button
                            onClick={handleGoogleLogin}
                            className="px-4 py-2 rounded text-sm "
                        >
                            Entrar com Google
                        </button>
                    </div>
                    <div className='flex flex-row border rounded justify-center p-2 hover:bg-gray-100 transition'>
                        <img
                            src={facebookIcon}
                            className='w-[33x] h-[33px]'
                        />
                        <button
                            onClick={handleFacebookLogin}
                            className='px-4 py-2 rounded text-sm '
                        >
                            Entrar com Facebook
                        </button>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default LoginPopup;
