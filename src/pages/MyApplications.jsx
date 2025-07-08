import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getAds } from '../firebase/firestoreService';
import Card from '../components/common/Card/Card';

const MyApplications = () => {
    const { user } = useContext(AuthContext);
    const [ads, setAds] = useState([]);

    useEffect(() => {
        async function fetchAds() {
            const all = await getAds();
            const filtered = all.filter(ad =>
                (ad.party || []).some(p => p.userId === user?.uid) ||
                (ad.pending || []).some(p => p.userId === user?.uid)
            );
            setAds(filtered);
        }
        if (user) fetchAds();
    }, [user]);

    return (
        <div className="flex flex-col items-center gap-4 mt-6">
            {ads.map(ad => (
                <Card key={ad.id} adData={ad} />
            ))}
            {ads.length === 0 && <p className="text-[var(--c-white)]">Nenhuma aplicação</p>}
        </div>
    );
};

export default MyApplications;
