import React from 'react';
import PropTypes from 'prop-types';

const LimitPopup = ({ isOpen, onClose, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="limit-popup-overlay">
            <div className="limit-popup">
                <h2>{title || 'Limite atingido'}</h2>
                <p>{message || 'Você atingiu o limite permitido.'}</p>
                <button onClick={onClose}>Fechar</button>
            </div>
        </div>
    );
};

LimitPopup.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    message: PropTypes.string,
};

export default LimitPopup;