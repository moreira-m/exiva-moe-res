import React, { useState } from 'react';

const vocations = ['Sorcerer', 'Druid', 'Knight', 'Paladin', 'Monk'];

const CharPopup = ({ onSubmit, onClose, submitLabel = 'Confirmar' }) => {
    const [name, setName] = useState('');
    const [level, setLevel] = useState('');
    const [vocation, setVocation] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !level || !vocation) return;
        onSubmit({ name, level, vocation });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-4 w-full max-w-sm text-black flex flex-col gap-4">
                <h2 className="text-lg font-bold text-center">Informações do personagem</h2>
                <input
                    className="border p-2 rounded"
                    placeholder="Nome do char"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className="border p-2 rounded"
                    placeholder="Level"
                    type="number"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                />
                <select
                    className="border p-2 rounded"
                    value={vocation}
                    onChange={(e) => setVocation(e.target.value)}
                >
                    <option value="">Selecione a vocação</option>
                    {vocations.map(v => (
                        <option key={v} value={v}>{v}</option>
                    ))}
                </select>
                <div className="flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="px-3 py-1 border rounded">Cancelar</button>
                    <button type="submit" className="px-3 py-1 bg-[#A8C090] rounded">{submitLabel}</button>
                </div>
            </form>
        </div>
    );
};

export default CharPopup;
