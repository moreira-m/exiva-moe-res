import React from 'react';

const Card = () => {
    return (
        <div className='bg-[#957DAD] w-[347px] h-auto flex-shrink-0 rounded-lg gap-4 flex flex-col p-4'>
            <div className='flex flex-row justify-between'>
                <p>
                    Soulcore
                </p>
                <p>
                    x5
                </p>
            </div>

            <div className='flex flex-row justify-between gap-2'>
                <div className='w-[97px] h-[97px] flex-shrink-0 rounded-[8px] bg-[#E0BBE4] m-auto mx-0'>
                    <img></img>
                </div>
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

            <div className='flex flex-row justify-between'>
                <p>Valor: </p>
                <button className='w-[79px] h-[30px] flex-shrink-0 rounded-[8px] bg-[#A8C090]'>
                    Apply
                </button>
            </div>
        </div>
    );
};

export default Card;