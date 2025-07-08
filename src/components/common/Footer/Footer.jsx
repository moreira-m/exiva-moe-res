import React from 'react';
import findFiend from './../../../assets/Find_Fiend.gif'
import githubIcon from './../../../assets/github-icon.svg'

// eslint-disable-next-line no-empty-pattern
const Footer = ({ }) => {
    return (
        <footer className='h-[70px] w-full border-t border-[var(--c-border-main)] bg-[var(--c-surface)] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex flex-row gap-8 items-center justify-center px-6'>
            {/* first */}
            <div className='flex flex-row gap-4 h-[38px] items-center'>
                <img src={findFiend} />
                <p className='text-[11px]'>© 2025 Exiva Moe Res</p>
            </div>

            {/* second */}
            <div className='flex flex-row gap-4'>
                <button className='text-[var(--c-white)] text-[11px] hover:text-[var(--c-gray)] hover:underline transition'>
                    Login
                </button>
                <button className='text-[var(--c-white)] text-[11px] hover:text-[var(--c-gray)] hover:underline transition'>
                    Sobre
                </button>
            </div>

            {/* third */}
            <div className='flex flex-row gap-4 h-[38px] items-center'>
                <p className='text-[11px]'>
                    Criado por <a href="https://github.com/moreira-m" target="_blank" rel="noopener noreferrer" className='underline hover:text-[var(--c-gray)] transition'>m-moreira</a>
                </p>
                <img 
                    src={githubIcon} 
                    alt="github icon" 
                    className='w-[20px] h-[20px]'
                />
            </div>
        </footer>
    )
};

export default Footer;