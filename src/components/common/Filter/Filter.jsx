import * as React from 'react';
import { useEffect, useState } from 'react';

const voc = [
    "Druid",
    "Knight",
    "Sorcerer",
    "Paladin",
    "Monk"
];

const type = [
    "Hunt",
    "Boss",
    "Acessos"
];


const Filter = () => {
    const [mundos, setMundos] = useState([]);

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

    return (
        <div>
            <div>

            </div>

            <div className="bg-[#E0BBE4] flex flex-row gap-4 justify-center p-4">
                <select className="w-[170px] h-[32px] rounded border-gray-300" defaultValue="">
                    <option value="" disabled>Escolha o tipo:</option>
                    {type.map(t => <option key={t} value={t}>{t}</option>)}
                </select>

                <select className="w-[170px] h-[32px] rounded border-gray-300" defaultValue="">
                    <option value="" disabled>Escolha um mundo:</option>
                    {mundos.map(m => <option key={m} value={m}>{m}</option>)}
                </select>

                <select className="w-[170px] h-[32px] rounded border-gray-300" defaultValue="">
                    <option value="" disabled>Escolha uma vocação:</option>
                    {voc.map(v => <option key={v} value={v}>{v}</option>)}
                </select>

                <input
                    type="number"
                    min={1}
                    placeholder="Level"
                    className="w-[170px] h-[32px] rounded border-gray-300 px-2"
                />
            </div>
        </div>
    );
};

export default Filter;