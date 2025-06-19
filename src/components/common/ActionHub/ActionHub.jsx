import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Form from '../Form/Form';

const ActionHub = ({ onCreateAd, onFilterChange }) => {
    const [activeMode, setActiveMode] = useState('filter');
    const [mundos, setMundos] = useState([]);
    const [creatures, setCreatures] = useState([]);
    const [selectedBoss, setSelectedBoss] = useState(null);
    const [selectedWorld, setSelectedWorld] = useState('');

    useEffect(() => {
        async function fetchMundos() {
            try {
                const resposta = await fetch('https://api.tibiadata.com/v4/worlds');
                const dados = await resposta.json();
                const nomes = dados.worlds.regular_worlds.map((m) => m.name);
                setMundos(nomes);
            } catch (erro) {
                console.error('Erro ao buscar mundos:', erro);
            }
        }
        fetchMundos();
    }, []);

    useEffect(() => {
        async function fetchCreatures() {
            const cached = localStorage.getItem('tibiaCreatures');
            if (cached) {
                setCreatures(JSON.parse(cached));
                return;
            }
            try {
                const response = await fetch('https://api.tibiadata.com/v4/creatures');
                const data = await response.json();
                if (data.creatures && data.creatures.creature_list) {
                    const formatted = data.creatures.creature_list.map(c => ({ value: c.name, label: c.name, image: c.image_url }));
                    localStorage.setItem('tibiaCreatures', JSON.stringify(formatted));
                    setCreatures(formatted);
                }
            } catch (error) {
                console.error('Erro ao buscar criaturas:', error);
            }
        }
        fetchCreatures();
    }, []);

    useEffect(() => {
        if (activeMode === 'filter') {
            onFilterChange({
                boss: selectedBoss?.label || '',
                world: selectedWorld
            });
        }
    }, [selectedWorld, selectedBoss, activeMode]);

    const toggleMode = (mode) => {
        setActiveMode(mode);
        if (mode === 'create') {
            setSelectedBoss(null);
            setSelectedWorld('');
            onFilterChange({ boss: '', world: '' });
        }
    };

    const handleCreateAd = (newAd) => {
        onCreateAd(newAd);
        setActiveMode('filter');
        setSelectedWorld(newAd.world);
        setSelectedBoss(null);
        onFilterChange({ boss: '', world: newAd.world });
    };

    const baseStyle = "py-2 px-6 font-bold transition-all duration-300";
    const activeStyle = "bg-[#BF6370] text-white rounded-md";
    const inactiveStyle = "bg-transparent text-gray-400";

    return (
        <div className="w-full">
            <div className="bg-[#453745] p-2 rounded-lg flex justify-center gap-2">
                <button
                    onClick={() => toggleMode('filter')}
                    className={`${baseStyle} ${activeMode === 'filter' ? activeStyle : inactiveStyle}`}
                >
                    Filtrar
                </button>
                <button
                    onClick={() => toggleMode('create')}
                    className={`${baseStyle} ${activeMode === 'create' ? activeStyle : inactiveStyle}`}
                >
                    Anunciar Vaga
                </button>
            </div>

            <div className="w-full mt-1">
                {activeMode === 'filter' && (
                    <div className="bg-[#453745] p-4 rounded-b-lg flex flex-row gap-4 justify-center">
                        <select
                            className="w-[170px] h-[38px] rounded border-gray-300"
                            value={selectedWorld}
                            onChange={(e) => setSelectedWorld(e.target.value)}
                        >
                            <option value="">Todos Mundos</option>
                            {mundos.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                        <Select
                            className="w-[250px]"
                            options={creatures}
                            value={selectedBoss}
                            onChange={setSelectedBoss}
                            placeholder="Nome do Boss..."
                            isClearable
                            styles={{ option: (p) => ({ ...p, color: 'black' }) }}
                        />
                    </div>
                )}

                {activeMode === 'create' && (
                    <div className="bg-transparent rounded-b-lg">
                        <Form onCreateAd={handleCreateAd} onWorldSelect={(world) => onFilterChange({ boss: '', world })} />
                    </div>
                )}
            </div>
        </div>
    );
};


export default ActionHub;