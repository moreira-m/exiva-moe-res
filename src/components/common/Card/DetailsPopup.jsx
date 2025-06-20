import React from 'react';

const DetailsPopup = () => {
    return (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-[-30px] p-2 bg-white text-black rounded shadow-lg z-50">
            <p className="text-sm font-semibold">Detalhes do time em breve!</p>
        </div>
    );
};

export default DetailsPopup;
