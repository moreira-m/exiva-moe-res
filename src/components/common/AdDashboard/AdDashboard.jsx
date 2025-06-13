import React, { useState, useEffect } from 'react';
import Form from './../Form/Form'; 
import Card from './../Card/Card'; 

const AdDashboard = () => {
    const [ads, setAds] = useState([]);

    useEffect(() => {
        const savedAds = localStorage.getItem('bossAds');
        if (savedAds) {
            setAds(JSON.parse(savedAds));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('bossAds', JSON.stringify(ads));
    }, [ads]);

    const handleCreateAd = (newAd) => {
        setAds(prevAds => [newAd, ...prevAds]);
    };

    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const activeAds = ads.filter(ad => {
        return (new Date().getTime() - ad.createdAt) < oneDayInMilliseconds;
    });

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold text-center text-white mb-8">Anúncios de Bosses</h1>
            
            <Form onCreateAd={handleCreateAd} />

            <div className="mt-12 flex flex-wrap gap-6 justify-center">
                {activeAds.map(ad => (
                    <Card key={ad.id} adData={ad} />
                ))}
            </div>
        </div>
    );
};

export default AdDashboard;