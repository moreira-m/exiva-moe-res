import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useOutsideClick from '../../../hooks/useOutsideClick.js';

const LimitPopup = ({ onClose, title, message }) => {
    const ref = useRef(null);
    useOutsideClick(ref, onClose);

    return (
    <div className="fixed inset-0 bg-[color:theme('colors.black')] bg-opacity-50 flex items-center justify-center z-50">
        <div ref={ref} className="bg-white rounded-lg shadow-lg p-4 text-black flex flex-col gap-4 w-full max-w-sm">
            <h2 className="text-lg font-bold text-center">{title || 'Limite atingido'}</h2>
            <p>{message || 'Você atingiu o limite permitido.'}</p>
            <button onClick={onClose} className="px-3 py-1 bg-accent text-white rounded">Fechar</button>
        </div>
    </div>
    );
};

LimitPopup.propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    message: PropTypes.string,
};

export default LimitPopup;
