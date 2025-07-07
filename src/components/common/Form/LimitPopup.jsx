import React from 'react';
import PropTypes from 'prop-types';

const LimitPopup = ({ onClose, title, message }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-4 text-black flex flex-col gap-4 w-full max-w-sm">
            <h2 className="text-lg font-bold text-center">{title || 'Limite atingido'}</h2>
            <p>{message || 'Você atingiu o limite permitido.'}</p>
            <button onClick={onClose} className="px-3 py-1 bg-[#BF6370] text-white rounded">Fechar</button>
        </div>
    </div>
);

LimitPopup.propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    message: PropTypes.string,
};

export default LimitPopup;
