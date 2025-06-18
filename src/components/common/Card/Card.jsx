import React from 'react';
import crystalCoinIcon from '../../../assets/Crystal_Coin.gif';

const Card = ({ adData }) => {
    return (
        <div className='bg-[#453745] w-[fit] h-auto flex-shrink-0 rounded-lg gap-4 flex flex-row p-8 transform hover:scale-105 transition-all duration-500'>
            <div className='flex flex-col justify-between gap-4'>
                <div className='w-[130px] h-[130px] flex-shrink-0 rounded-[8px] bg-gray-800 m-auto mx-0'>
                    <img src={adData.soulcoreImage} alt={adData.soulCoreName} className="w-full h-full object-contain"/>
                </div>
                <div className='flex flex-row gap-2'>
                    <img src={crystalCoinIcon} alt="Crystal Coin"/>
                    <p className='text-white mt-auto mb-auto'>{adData.value}</p>
                </div>
            </div>

            <div className='flex flex-col gap-8'>
                <div className='flex flex-col justify-between gap-6'>
                    <h2 className='text-left text-white font-bold text-xl text-[30px]'>
                        {adData.soulCoreName}
                    </h2>
                    <div className='grid grid-flow-col grid-rows-2 gap-6 gap-y-2 text-white'>
                        {adData.roles.map((role) => (
                            <p 
                                key={role.name}
                                className='text-left'
                            >
                                {role.name}: {role.current}/{role.total}
                            </p>
                        ))}
                    </div>
                </div>
                <button className='w-[79px] h-[30px] flex-shrink-0 rounded-[8px] bg-[#A8C090] ml-auto font-bold mt-auto text-white'>
                    Apply
                </button>
            </div>
        </div>
    );
};

export default Card;