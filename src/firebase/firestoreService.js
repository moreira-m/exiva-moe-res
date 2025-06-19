import { db } from './firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export const createAd = async (adData) => {
    try {
        const docRef = await addDoc(collection(db, "bossAds"), adData);
        return docRef.id;
    } catch (error) {
        console.error("Erro na criação de anuncios:", error);
        throw error;
    }
};

export const getAds = async () => {
    try {
        const snapshot = await getDocs(collection(db, "bossAds"));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Erro na busca de anuncios:", error);
        return [];
    }
};