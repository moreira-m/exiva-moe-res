import React, { useState, useContext } from 'react';
import crystalCoinIcon from '../../../assets/Crystal_Coin.gif';
import MarkStarIcon from '../../../assets/mark-star-icon.svg?react';
import SearchIconCards from '../../../assets/search-icon-cards.svg?react';
import DetailsPopup from './DetailsPopup';
import CharPopup from '../Form/CharPopup';
import { getRoleIcon } from '../../../utils/vocations.js';
import { applyToAd, removeApplication, deleteAd } from '../../../firebase/firestoreService';
import { AuthContext } from '../../../context/AuthContext';
// import tilesBossIcon from '../../../assets/tiles-icon.png'

const handleFavoriteClick = () => {

};


const Card = ({ adData, onDelete }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [showApply, setShowApply] = useState(false);
    const [party, setParty] = useState(adData.party || []);
    const [pending, setPending] = useState(adData.pending || []);
    const { user } = useContext(AuthContext);
    const alreadyApplied =
        [...party, ...pending].some(p => p.userId === user?.uid);
    const isOwner = adData.userId === user?.uid;

    const handleSearchClick = () => {
        setShowPopup(true);
    };

    const handleApply = async (info) => {
        if (!user) return;
        const success = await applyToAd(
            adData.id,
            { ...info, userId: user.uid },
            adData.approvalRequired
        );

        if (success) {
            if (adData.approvalRequired) {
                setPending(prev => [...prev, { ...info, userId: user.uid }]);
            } else {
                setParty(prev => [...prev, { ...info, userId: user.uid }]);
            }
        }

        setShowApply(false);
    };

    const handleRemove = async () => {
        if (!user) return;
        const success = await removeApplication(adData.id, user.uid);
        if (success) {
            setParty(prev => prev.filter(p => p.userId !== user.uid));
            setPending(prev => prev.filter(p => p.userId !== user.uid));
        }
    };

    const handleDelete = async () => {
        if (!user) return;
        const confirmDelete = window.confirm('Excluir este anúncio?');
        if (!confirmDelete) return;
        const success = await deleteAd(adData.id);
        if (success) {
            onDelete && onDelete(adData.id);
        }
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
                    <div className='flex flex-row gap-2 h-[45px]'>
                        {party.map((p, idx) => (
                            <img
                                key={idx}
                                src={getRoleIcon(p.vocation)}
                                alt=''
                                className='w-[45px] h-[45px]'
                            />
                        ))}
                    </div>
                    <div className='flex flex-row overflow-hidden w-full justify-between gap-6'>
                        <SearchIconCards
                            onClick={handleSearchClick}
                            className='cursor-pointer m-auto'
                        />

                        {showPopup && (
                            <DetailsPopup
                                party={party}
                                onClose={() => setShowPopup(false)}
                                onApply={() => {
                                    setShowPopup(false);
                                    if (alreadyApplied) {
                                        handleRemove();
                                    } else {
                                        setShowApply(true);
                                    }
                                }}
                                alreadyApplied={alreadyApplied}
                                isOwner={isOwner}
                                onDelete={handleDelete}
                            />
                        )}

                        {isOwner ? (
                            <div className="w-full h-[30px] rounded-[8px] mt-auto bg-[#BF6370] text-white flex items-center justify-center">
                                Líder
                            </div>
                        ) : (
                            <button
                                onClick={alreadyApplied ? handleRemove : () => setShowApply(true)}
                                className={`w-full h-[30px] rounded-[8px] mt-auto text-black ${alreadyApplied ? 'bg-red-600' : 'bg-[#A8C090]'}`}
                            >
                                {alreadyApplied ? 'Remover' : 'Aplicar'}
                            </button>
                        )}
                        {showApply && (
                            <CharPopup onSubmit={handleApply} onClose={() => setShowApply(false)} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
