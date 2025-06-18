import React, { useState, useEffect } from "react";
import Select from "react-select";

const Form = ({ onCreateAd }) => {
    const [creatures, setCreatures] = useState([]);
    const [soulCore, setSoulCore] = useState(null);
    const [inputValue, setInputValue] = useState('');

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
        fetchCreatures();
    }, []);


    const handleSubmit = (event) => {
        event.preventDefault();
        if (!soulCore) {
            alert("Insira um SoulCore!");
            return;
        }

        const newAd = {
            id: new Date().getTime(),
            createdAt: new Date().getTime(),
            soulCoreName: soulCore.label,
            soulcoreImage: soulCore.image,
            value: inputValue || "A combinar",
            roles: [
                { name: "Sorcerer", current: 1, total: 1 },
                { name: "Druid", current: 0, total: 1 },
                { name: "Knight", current: 0, total: 1 },
                { name: "Paladin", current: 0, total: 1 },
                { name: "Monk", current: 0, total: 1 },
            ]
        };

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