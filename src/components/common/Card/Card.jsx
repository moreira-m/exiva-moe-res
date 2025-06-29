import React, { useState } from 'react';
import crystalCoinIcon from '../../../assets/Crystal_Coin.gif';
import MarkStarIcon from '../../../assets/mark-star-icon.svg?react';
import SearchIconCards from '../../../assets/search-icon-cards.svg?react'
import DetailsPopup from './DetailsPopup';
// import tilesBossIcon from '../../../assets/tiles-icon.png'

const handleFavoriteClick = () => {

};

const roleIcons = {
    Sorcerer: '/roles/sorcerer-front.png',
    Druid: '/roles/druid-front.png',
    Knight: '/roles/knight-front.png',
    Paladin: '/roles/paladin-front.png',
    Monk: '/roles/monk-front.png',
};

const Card = ({ adData }) => {
    const [showPopup, setShowPopup] = useState(false);

    const handleSearchClick = () => {
        setShowPopup(true);
    };

    return (
        <div className='bg-[#453745] w-[450px] h-auto flex-shrink-0 rounded-lg gap-[20px] flex flex-row p-3 relative max-h-64'>

            {/* Estrela de favoritar */}
            <button
                onClick={handleFavoriteClick}
                className='absolute top-[-5%] right-[15%]'
            >
                <MarkStarIcon className='absolute' />
            </button>

            {/* Imagem da criatura */}
            <div className='w-[130px] h-[130px] flex-shrink-0 rounded-[8px] bg-[#BF6370] m-0 h-full'>
                <img src={adData.soulcoreImage} alt={adData.soulCoreName} className="w-full h-full object-contain" />
            </div>


            {/* Texto (Bloco ao lado da imagem) */}
            <div className='flex flex-col w-full'>
                <div className='flex flex-col justify-between gap-4'>
                    <div className='border-b border-white mt-3'>
                        <h2 className='text-left text-white font-bold text-xl text-[30px]'>
                            {adData.soulCoreName}
                        </h2>
                    </div>
                    <div className='flex flex-row gap-2'>
                        <img src={crystalCoinIcon} alt="Crystal Coin" />
                        <p className='text-white mt-auto mb-auto'>{adData.value}</p>
                    </div>
                    <div className='flex flex-row gap-2'>
                        {adData.roles.map((role, idx) => (
                            <img
                                key={idx}
                                src={role.icon ?? roleIcons[role.name]}
                                alt=""
                                className="w-[45px] h-[45px]"
                            />
                        ))}
                        {/* <img src={tilesBossIcon} /> */}
                    </div>
                    <div className='flex flex-row overflow-hidden w-full justify-between gap-6'>
                        <SearchIconCards
                            onClick={handleSearchClick}
                            className='cursor-pointer m-auto'
                        />

                        {showPopup && (
                            <DetailsPopup onClose={() => setShowPopup(false)} />
                        )}

                        <button className='w-full h-[30px] rounded-[8px] bg-[#A8C090] mt-auto text-black'>
                            Aplicar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;