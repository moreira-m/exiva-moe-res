import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import LimitPopup from "./LimitPopup";
import { createAd, getAdsCreateToday } from '../../../firebase/firestoreService';
import { Timestamp } from "firebase/firestore";
import { AuthContext } from '../../../context/AuthContext';

const Form = ({ onCreateAd, onWorldSelect, charInfo, onCharInfoRequest }) => {
    const [creatures, setCreatures] = useState([]);
    const [soulCore, setSoulCore] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [world, setWorld] = useState('');
    const [worlds, setWorlds] = useState([]);
    const [showLimitPopup, setShowLimitPopup] = useState(false);
    const [requireApproval, setRequireApproval] = useState(false);

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


    const { user } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!user) {
            alert('Faça login para anunciar vagas');
            return;
        }
        if (!soulCore) return alert('Insira um SoulCore!'); // mudar alerta
        if (!world) return alert('Selecione um mundo!'); // mudar alerta

        const userId = user.uid;
        const maxAds = 5;
        const adsToday = await getAdsCreateToday(userId);

        if (adsToday >= maxAds) {
            console.log('Atingiu o limite');
            setShowLimitPopup(true);
            return;
        }

        if (!charInfo) {
            const partialAd = {
                createdAt: Timestamp.now(),
                soulCoreName: soulCore.label,
                soulcoreImage: soulCore.image,
                value: inputValue || "A combinar",
                world,
                userId,
                approvalRequired: requireApproval,
            };
            onCharInfoRequest && onCharInfoRequest(partialAd);
            return;
        }

        const newAd = {
            createdAt: Timestamp.now(),
            soulCoreName: soulCore.label,
            soulcoreImage: soulCore.image,
            value: inputValue || "A combinar",
            world,
            userId,
            approvalRequired: requireApproval,
            party: [{ ...charInfo, userId }],
            pending: [],
        };

        const docId = await createAd(newAd);
        const adWithId = { ...newAd, id: docId };
        onCreateAd(adWithId);

        setSoulCore(null);
        setInputValue('');
    };

    const customStyles = {
        option: (provided) => ({ ...provided, color: 'black' }),
        control: (provided) => ({ ...provided, backgroundColor: 'white', border: '1px solid #ccc' }),
    };

    return (
        <form onSubmit={handleSubmit} className="text-white bg-card-bg rounded-b-lg flex flex-row gap-4 justify-center p-4">
            <div>
                <Select 
                    options={worlds.map(w => ({ label: w, value: w }))}
                    value={world ? { label: world, value: world } : null}
                    onChange={(selected) => {
                        const selectedValue = selected ? selected.value : '';
                        setWorld(selectedValue);
                        onWorldSelect && onWorldSelect(selectedValue);
                    }}

                    placeholder="Selecione o mundo"
                    isClearable
                    styles={{ option: (p) => ({ ...p, color: 'black' }) }}
                />
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
                    type="number"
                    id="value-input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ex: 50000"
                    min="0"
                    step="1"
                    className="w-full p-2 rounded text-black bg-white"
                />
            </div>
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="approval-check"
                    checked={requireApproval}
                    onChange={(e) => setRequireApproval(e.target.checked)}
                />
                <label htmlFor="approval-check">Aprovar inscrições</label>
            </div>
            <button
                type="submit"
                className="h-[38px] px-4 rounded bg-accent-green font-bold"
            >
                Criar Anúncio
            </button>

            {showLimitPopup && (
                <LimitPopup onClose={() => setShowLimitPopup(false)} />
            )}
        </form>
    );
};

export default Form;
