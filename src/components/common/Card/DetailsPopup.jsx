import React, { useRef } from 'react';
import { getRoleIcon } from '../../../utils/vocations.js';
import useOutsideClick from '../../../hooks/useOutsideClick.js';

const DetailsPopup = ({ party, onClose, onApply, alreadyApplied, isOwner, onDelete }) => {
    const ref = useRef(null);
    useOutsideClick(ref, onClose);

    return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div ref={ref} className="bg-white rounded-lg shadow-lg p-4 text-black relative w-full max-w-sm">
            <button
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
            >
                &times;
            </button>
            <h2 className="text-lg font-bold mb-2 text-center text-gray-400">Participantes</h2>
            <ul className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                {party.map((p, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                        <img src={getRoleIcon(p.vocation)} alt={p.vocation} className="w-8 h-8" />
                        {p.url ? (
                            <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                {p.name}
                            </a>
                        ) : (
                            <span>{p.name}</span>
                        )}
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
                    className={`mt-4 w-full h-[30px] rounded-[8px] text-black ${alreadyApplied ? 'bg-red-600' : 'bg-accent-green'}`}
                >
                    {alreadyApplied ? 'Remover' : 'Aplicar'}
                </button>
            )}
        </div>
    </div>
    );
};

export default DetailsPopup;

