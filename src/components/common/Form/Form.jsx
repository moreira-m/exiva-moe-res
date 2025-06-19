import React, { useState, useEffect } from "react";
import Select from "react-select";
import { createAd } from '../../../firebase/firestoreService';

const Form = ({ onCreateAd, onWorldSelect }) => {
    const [creatures, setCreatures] = useState([]);
    const [soulCore, setSoulCore] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [world, setWorld] = useState('');
    const [worlds, setWorlds] = useState([]);

    useEffect(() => {
        async function fetchCreatures() {
            try {
                const response = await fetch('https://api.tibiadata.com/v4/creatures');
                const data = await response.json();
                if (data.creatures && data.creatures.creature_list) {
                    const formattedCreatures = data.creatures.creature_list.map(creature => ({
                        value: creature.name,
                        label: creature.name,
                        image: creature.image_url
                    }));
                    setCreatures(formattedCreatures);
                }
            } catch (error) {
                console.error('Erro ao buscar criaturas:', error);
            }
        }

        async function fetchWorlds() {
            const response = await fetch('https://api.tibiadata.com/v4/worlds');
            const data = await response.json();
            setWorlds(data.worlds.regular_worlds.map((w) => w.name));
        }

        fetchWorlds();
        fetchCreatures();
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!soulCore) return alert('Insira um SoulCore!');
        if (!world) return alert('Selecione um mundo!');

        const base = import.meta.env.BASE_URL;


        const newAd = {
            id: new Date().getTime(),
            createdAt: new Date().getTime(),
            soulCoreName: soulCore.label,
            soulcoreImage: soulCore.image,
            value: inputValue || "A combinar",
            world,
            roles: [
                { icon: `${base}roles/sorcerer-icon.gif`, current: 1, total: 1 },
                { icon: `${base}roles/druid-icon.gif`, current: 0, total: 1 },
                { icon: `${base}roles/knight-icon.gif`, current: 0, total: 1 },
                { icon: `${base}roles/paladin-icon.gif`, current: 0, total: 1 },
                { icon: `${base}roles/monk-icon.gif`, current: 0, total: 1 },
            ],
        };

        await createAd(newAd);
        onCreateAd(newAd);
        setSoulCore(null);
        setInputValue('');
    };

    const customStyles = {
        option: (provided) => ({ ...provided, color: 'black' }),
        control: (provided) => ({ ...provided, backgroundColor: '#fff', border: '1px solid #ccc' }),
    };

    return (
        <form onSubmit={handleSubmit} className="bg-[#453745] text-white bg-[#453745] p-4 rounded-b-lg flex flex-row gap-4 justify-center p-4">
            <div>
                <select
                    className="w-[180px] h-[38px] rounded text-black"
                    value={world}
                    onChange={(e) => {
                        const selected = e.target.value;
                        setWorld(selected);
                        onWorldSelect && onWorldSelect(selected);
                    }}
                >
                    <option value="">Selecione o mundo</option>
                    {worlds.map(w => (
                        <option key={w} value={w}>{w}</option>
                    ))}
                </select>
            </div>
            <div className="w-fit min-w-[180px] h-[38px] rounded border-gray-300">
                {/* <label htmlFor="soul-core-select" className="block mb-1">
                     Soulcore
                 </label> */}
                <Select
                    id="soul-core-select"
                    options={creatures}
                    onChange={setSoulCore}
                    value={soulCore}
                    placeholder="Ex: Demon"
                    isClearable
                    isLoading={creatures.length === 0}
                    styles={customStyles}
                    noOptionsMessage={() => "Nenhuma criatura encontrada"}
                />
            </div>
            <div className="w-fit min-w-[180px] h-[38px] rounded border-gray-300">
                {/* <label htmlFor="value-input" className="block mb-1">
                     Valor pela vaga
                 </label> */}
                <input
                    type="text"
                    id="value-input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ex: 500k"
                    className="w-full p-2 rounded text-black"
                />
            </div>
            <button
                type="submit"
                className="h-[38px] px-4 rounded bg-[#A8C090] font-bold"
            >
                Criar Anúncio
            </button>
        </form>
    );
};

export default Form;