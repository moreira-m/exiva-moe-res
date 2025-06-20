import { db } from './firebase';
import { collection, addDoc, getDocs, query, where, Timestamp, getFirestore } from 'firebase/firestore';

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

export async function getAdsCreateToday(userId) {
    const db = getFirestore();
    const adsRef = collection(db, 'ads');

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const q = query(
        adsRef,
        where("userId", "==", userId),
        where("createdAt", ">=", Timestamp.fromDate(startOfDay))
    );

    try {
        const snapshot = await getDocs(q);
        console.log(`Encontrados ${snapshot.size} anúncios hoje para user ${userId}`);
        return snapshot.size;
    } catch (error) {
        console.log("nao conseguiu verificar os anuncios de hoje", error)
        return 0;
    }
}