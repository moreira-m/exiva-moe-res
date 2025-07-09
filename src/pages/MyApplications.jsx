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
        <div className="mt-12 flex flex-wrap gap-6 max-w-[1440px] m-auto justify-center min-h-screen content-start">
            {ads.map(ad => (
                <Card key={ad.id} adData={ad} />
            ))}
            {ads.length === 0 && <p className="text-white">Nenhuma aplicação</p>}
        </div>
    );
};

export default MyApplications;
