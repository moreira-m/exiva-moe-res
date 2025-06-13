import React, { useState, useEffect } from "react";
import Select from "react-select";

const Form = () => {
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
            soulCoreName: soulCore.label,
            soulcoreImage: soulCore.image,
            value: inputValue,
            roles: [{
                name: "Knight",
                current: 0,
                total: 1
            }]
        };

        console.log("Anuncio criado: ", newAd);
    };

    const customStyles = {
        option: (provided) => ({ ...provided, color: 'black' }),
        control: (provided) => ({ ...provided, backgroundColor: '#fff', border: '1px solid #ccc' }),
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-700 text-white rounded-md max-w-lg mx-auto">
            <h2 className="text-2xl mb-4">Criar um Time</h2>

            <div className="mb-4">
                <label htmlFor="soul-core-select" className="block mb-1">
                    SoulCore Name
                </label>
                <Select
                    id="soul-core-select"
                    options={creatures}
                    onChange={setSoulCore}
                    value={soulCore}
                    placeholder="Digite aqui a criatura do SoulCore"
                    isClearable
                    isLoading={creatures.length === 0}
                    styles={customStyles}
                    noOptionsMessage={() => "Nenhuma criatura encontrada"}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="value-input" className="block mb-1">
                    Valor pela vaga
                </label>
                <input
                    type="text"
                    id="value-input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ex.: 500k ou Grátis"
                    className="w-full p-2 rounded text-black"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 p-2 rounded"
            >
                Criar Anúncio
            </button>
        </form>
    );
};

export default Form;