import React from 'react';
import crystalCoinIcon from '../../../assets/Crystal_Coin.gif';

const Card = () => {
    return (
        <div className='bg-[#453745] w-[fit] h-auto flex-shrink-0 rounded-lg gap-4 flex flex-row p-8 transform hover:scale-105 transition-all duration-500'>
            <div className='flex flex-col justify-between gap-4'>
                <div className='w-[130px] h-[130px] flex-shrink-0 rounded-[8px] bg-[#BF6370] m-auto mx-0'>
                    <img></img>
                </div>
                <div className='flex flex-row gap-2'>
                    <img src={crystalCoinIcon}></img>
                    <p className='text-white mt-auto mb-auto'>500k </p>
                </div>

            </div>

            <div className='flex flex-col gap-8'>
                <div className='flex flex-col justify-between gap-2'>
                    <h2 className='text-left'>
                        Icecold Book
                    </h2>
                    <div className='grid grid-flow-col grid-rows-2 gap-4'>
                        <p>
                            Sorcerer: 1/1
                        </p>
                        <p>
                            Druid: 0/1
                        </p>
                        <p>
                            Knight: 0/1
                        </p>
                        <p>
                            Paladin: 0/1
                        </p>
                        <p>
                            Monk: 0/1
                        </p>
                    </div>
                </div>
                <button className='w-[79px] h-[30px] flex-shrink-0 rounded-[8px] bg-[#A8C090] ml-auto'>
                    Apply
                </button>
            </div>

        </div >
    );
};

export default Card;