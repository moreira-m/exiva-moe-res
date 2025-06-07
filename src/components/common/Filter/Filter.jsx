import * as React from 'react';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

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

            <div className='bg-[#E0BBE4] flex flex-row'>
                <Autocomplete
                    options={type}
                    renderInput={(params) => <TextField {...params} label="Escolha o tipo:" />}
                    freeSolo
                    className=''
                />

                <Autocomplete
                    options={mundos}
                    renderInput={(params) => <TextField {...params} label="Escolha um mundo:" />}
                    freeSolo
                    className=''
                />

                <Autocomplete
                    options={voc}
                    renderInput={(params) => <TextField {...params} label="Escolha uma vocação: " />}
                    freeSolo
                    className=''
                />

                <TextField
                    label="Level"
                    type="number"
                    inputProps={{ min: 1 }}
                    variant="outlined"
                    fullWidth
                />
            </div>
        </div>
    );
};

export default Filter;