import React, { useState, useEffect } from 'react';
import ActionHub from '../ActionHub/ActionHub';
import Card from '../Card/Card';
import Form from '../Form/Form';
import { getAds } from '../../../firebase/firestoreService';

const AdDashboard = () => {
    const [ads, setAds] = useState([]);
    const [filters, setFilters] = useState({ boss: '', world: '' });
    const [showCreateForm, setShowCreateForm] = useState(false);

    useEffect(() => {
        async function fetchAds() {
            const allAds = await getAds();
            setAds(allAds);
        }
        fetchAds();
    }, []);

    const handleCreateAd = (newAd) => {
        setFilters({ boss: '', world: newAd.world });
        setAds(prevAds => [newAd, ...prevAds]);
        setShowCreateForm(false);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const activeAds = ads
        .filter(ad => (new Date().getTime() - ad.createdAt) < oneDayInMilliseconds)
        .filter(ad => filters.boss ? ad.soulCoreName === filters.boss : true)
        .filter(ad => filters.world ? ad.world === filters.world : true);

    const title = filters.world
        ? `Soulcores em ${filters.world}`
        : 'Soulcores';

    return (
        <div>
            <ActionHub
                onFilterChange={handleFilterChange}
                showCreateForm={showCreateForm}
                setShowCreateForm={(v) => {
                    setShowCreateForm(v);
                    if (v) setFilters({ boss: '', world: '' });
                }}
            />

            <h1 className="text-4xl font-bold text-center text-white mb-8 mt-8">
                {title}
            </h1>

            {showCreateForm && (
                <Form
                    onCreateAd={handleCreateAd}
                    onWorldSelect={(world) => handleFilterChange({ boss: '', world })}
                />

            )}
            <div className="mt-12 flex flex-wrap gap-6 max-w-[1440px] m-auto justify-center min-h-screen content-start">
                {activeAds.map(ad => (
                    <Card key={ad.id} adData={ad} />
                ))}
            </div>
        </div>
    );
};

export default AdDashboard;
