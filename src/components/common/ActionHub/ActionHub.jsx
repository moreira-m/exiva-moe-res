import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import Form from '../Form/Form';
import { AuthContext } from '../../../context/AuthContext';
import CharPopup from '../Form/CharPopup';

const ActionHub = ({ onCreateAd, onFilterChange }) => {
    const [activeMode, setActiveMode] = useState('filter');
    const [mundos, setMundos] = useState([]);
    const [creatures, setCreatures] = useState([]);
    const [selectedBoss, setSelectedBoss] = useState(null);
    const [selectedWorld, setSelectedWorld] = useState('');
    const [charInfo, setCharInfo] = useState(null);
    const [showCharPopup, setShowCharPopup] = useState(false);
    const { user, login } = useContext(AuthContext);
    

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
        if (mode === 'create') {
            if (!user) {
                login();
                return;
            }
            setSelectedBoss(null);
            setSelectedWorld('');
            onFilterChange({ boss: '', world: '' });
            setShowCharPopup(true);
            return;
        }
        setActiveMode(mode);
    };

    const handleCreateAd = (newAd) => {
        onCreateAd(newAd);
        setActiveMode('filter');
        setSelectedWorld(newAd.world);
        setSelectedBoss(null);
        onFilterChange({ boss: '', world: newAd.world });
        setCharInfo(null);
    };

    const handleCharSubmit = (info) => {
        setCharInfo(info);
        setShowCharPopup(false);
        setActiveMode('create');
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
                        <Select
                            className="min-w-[180px] w-fit"
                            options={mundos.map(w => ({ label: w, value: w }))}
                            value={selectedWorld ? { label: selectedWorld, value: selectedWorld } : null}
                            onChange={(selected) => {
                                const selectedValue = selected ? selected.value : '';
                                setSelectedWorld(selectedValue);
                            }}
                            placeholder="Selecione o mundo"
                            isClearable
                            styles={{ option: (p) => ({ ...p, color: 'black' }) }}
                        />
                        <Select
                            className="w-[250px]"
                            options={creatures}
                            value={selectedBoss}
                            onChange={setSelectedBoss}
                            placeholder="Soulcore"
                            isClearable
                            styles={{ option: (p) => ({ ...p, color: 'black' }) }}
                        />
                    </div>
                )}

                {activeMode === 'create' && (
                    <div className="bg-transparent rounded-b-lg">
                        <Form
                            onCreateAd={handleCreateAd}
                            onWorldSelect={(world) => onFilterChange({ boss: '', world })}
                            charInfo={charInfo}
                        />
                    </div>
                )}
                {showCharPopup && (
                    <CharPopup onSubmit={handleCharSubmit} onClose={() => setShowCharPopup(false)} />
                )}
            </div>
        </div>
    );
};


export default ActionHub;
