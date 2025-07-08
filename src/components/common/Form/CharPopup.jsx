import React, { useState, useRef } from 'react';
import { vocationMap } from '../../../utils/vocations.js';
import useOutsideClick from '../../../hooks/useOutsideClick.js';

const CharPopup = ({ onSubmit, onClose, submitLabel = 'Confirmar' }) => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) return;
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`https://api.tibiadata.com/v4/character/${encodeURIComponent(name)}`);
            const data = await response.json();
            const char = data?.character?.character;
            if (!char) {
                setError('Personagem não encontrado');
                setLoading(false);
                return;
            }
            const url = data?.information?.tibia_urls?.[0] || '';
            const vocation = vocationMap[char.vocation] || char.vocation;
            onSubmit({ name: char.name, level: char.level, vocation, url });
        } catch (err) {
            console.error('Erro ao buscar personagem:', err);
            setError('Erro ao buscar personagem');
        }
        setLoading(false);
    };

    const ref = useRef(null);
    useOutsideClick(ref, onClose);

    return (
        <div className="fixed inset-0 bg-[color:theme('colors.black')] bg-opacity-50 flex items-center justify-center z-50">
            <form ref={ref} onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-4 w-full max-w-sm text-black flex flex-col gap-4">
                <h2 className="text-lg font-bold text-center">Informações do personagem</h2>
                <input
                    className="border p-2 rounded"
                    placeholder="Nome do char"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {error && <span className="text-red-600 text-sm">{error}</span>}
                <div className="flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="px-3 py-1 border rounded">Cancelar</button>
                    <button type="submit" disabled={loading} className="px-3 py-1 bg-accent-green rounded">
                        {loading ? 'Buscando...' : submitLabel}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CharPopup;
