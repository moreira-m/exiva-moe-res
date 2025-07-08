import React from 'react';

const roleIcons = {
    Sorcerer: '/roles/sorcerer-front.png',
    Druid: '/roles/druid-front.png',
    Knight: '/roles/knight-front.png',
    Paladin: '/roles/paladin-front.png',
    Monk: '/roles/monk-front.png',
};

const DetailsPopup = ({ party, onClose, onApply, alreadyApplied, isOwner, onDelete }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-4 text-black relative w-full max-w-sm">
            <button
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
            >
                &times;
            </button>
            <h2 className="text-lg font-bold mb-2 text-center">Participantes</h2>
            <ul className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                {party.map((p, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                        <img src={roleIcons[p.vocation]} alt={p.vocation} className="w-8 h-8" />
                        <span>{p.name}</span>
                        <span className="ml-auto">lvl {p.level}</span>
                    </li>
                ))}
                {party.length === 0 && (
                    <li className="text-center text-sm">Nenhum participante</li>
                )}
            </ul>
            {isOwner ? (
                <button
                    onClick={onDelete}
                    className="mt-4 w-full h-[30px] rounded-[8px] bg-red-600 text-white"
                >
                    Excluir Anúncio
                </button>
            ) : (
                <button
                    onClick={onApply}
                    className={`mt-4 w-full h-[30px] rounded-[8px] text-black ${alreadyApplied ? 'bg-red-600' : 'bg-[#A8C090]'}`}
                >
                    {alreadyApplied ? 'Remover' : 'Aplicar'}
                </button>
            )}
        </div>
    </div>
);

export default DetailsPopup;

