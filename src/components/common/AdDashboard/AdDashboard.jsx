import React, { useState, useEffect } from 'react';
import ActionHub from '../ActionHub/ActionHub';
import Card from '../Card/Card';
import { getAds } from '../../../firebase/firestoreService';

const AdDashboard = () => {
    const [ads, setAds] = useState([]);
    const [filters, setFilters] = useState({ boss: '', world: '' });

    useEffect(() => {
        async function fetchAds () {
            const allAds = await getAds();
            setAds(allAds);            
        }
        fetchAds();
    }, []);


    const handleCreateAd = (newAd) => {
        setAds(prevAds => [newAd, ...prevAds]);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const activeAds = ads
        .filter(ad => (new Date().getTime() - ad.createdAt) < oneDayInMilliseconds)
        .filter(ad => filters.boss ? ad.soulCoreName === filters.boss : true)
        .filter(ad => filters.world ? ad.world === filters.world : true);

    return (
        <div className="">

            <ActionHub
                onCreateAd={handleCreateAd}
                onFilterChange={handleFilterChange}
            />
            <h1 className="text-4xl font-bold text-center text-white mb-8 mt-8">Soulcore</h1>

            <div className="mt-12 flex flex-wrap gap-6 max-w-[1440px] m-auto justify-center">
                {activeAds.map(ad => (
                    <Card key={ad.id} adData={ad} />
                ))}
            </div>
        </div>
    );
};

export default AdDashboard;