import React from 'react';

const Card = () => {
    return (
        <div className='bg-[#453745] w-[347px] h-auto flex-shrink-0 rounded-lg gap-4 flex flex-row p-4 transform hover:scale-105 transition-all duration-500'>
            <div className='flex flex-col justify-between'>
                <div className='w-[97px] h-[97px] flex-shrink-0 rounded-[8px] bg-[#BF6370] m-auto mx-0'>
                    <img></img>
                </div>
                <p>Valor: </p>
            </div>

            <div>
                <div className='flex flex-col justify-between gap-2'>
                    <h2>
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
                <button className='w-[79px] h-[30px] flex-shrink-0 rounded-[8px] bg-[#A8C090]'>
                    Apply
                </button>
            </div>

        </div>
    );
};

export default Card;