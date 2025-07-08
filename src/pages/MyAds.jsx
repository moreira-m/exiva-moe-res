import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getAds, respondToApplication } from '../firebase/firestoreService';
import Card from '../components/common/Card/Card';

const MyAds = () => {
    const { user } = useContext(AuthContext);
    const [ads, setAds] = useState([]);

    useEffect(() => {
        async function fetchAds() {
            const all = await getAds();
            setAds(all.filter(a => a.userId === user?.uid));
        }
        if (user) fetchAds();
    }, [user]);

    const handleDecision = async (adId, applicantId, accept) => {
        await respondToApplication(adId, applicantId, accept);
        setAds(prev => prev.map(ad => {
            if (ad.id !== adId) return ad;
            const pending = ad.pending.filter(p => p.userId !== applicantId);
            const party = accept ? [...ad.party, ad.pending.find(p => p.userId === applicantId)] : ad.party;
            return { ...ad, pending, party };
        }));
    };

    return (
        <div className="flex flex-col items-center gap-4 mt-6">
            {ads.map(ad => (
                <div key={ad.id} className="flex flex-col gap-2">
                    <Card adData={ad} onDelete={(id) => setAds(prev => prev.filter(a => a.id !== id))} />
                    {ad.pending && ad.pending.length > 0 && (
                        <div className="bg-[var(--c-card-bg)] p-2 rounded text-[var(--c-white)]">
                            <h3 className="font-bold">Solicitações</h3>
                            {ad.pending.map(p => (
                                <div key={p.userId} className="flex justify-between items-center">
                                    <span>
                                        {p.url ? (
                                            <a href={p.url} target="_blank" rel="noopener noreferrer" className="underline">
                                                {p.name}
                                            </a>
                                        ) : p.name}
                                        {' - '}{p.vocation} - lvl {p.level}
                                    </span>
                                    <div className="flex gap-2">
                                        <button className="px-2 bg-green-600 rounded" onClick={() => handleDecision(ad.id, p.userId, true)}>Aceitar</button>
                                        <button className="px-2 bg-[var(--c-red-600)] rounded" onClick={() => handleDecision(ad.id, p.userId, false)}>Recusar</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
            {ads.length === 0 && <p className="text-[var(--c-white)]">Nenhum anúncio</p>}
        </div>
    );
};

export default MyAds;
