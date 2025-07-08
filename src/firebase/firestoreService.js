import { db } from './firebase';
import { collection, addDoc, getDocs, query, where, Timestamp, doc, updateDoc, arrayUnion, getDoc, deleteDoc } from 'firebase/firestore';

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
    const adsRef = collection(db, 'bossAds');

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

export const applyToAd = async (adId, charInfo, approvalRequired) => {
    try {
        const docRef = doc(db, 'bossAds', adId);
        const snap = await getDoc(docRef);
        if (!snap.exists()) return false;
        const data = snap.data();
        const existing = [...(data.party || []), ...(data.pending || [])];

        // Impede inscrições duplicadas para o mesmo personagem ou usuário
        if (existing.some(p => p.userId === charInfo.userId ||
            (p.name && charInfo.name && p.name.toLowerCase() === charInfo.name.toLowerCase()))) {
            return false;
        }

        // Limite máximo de 5 jogadores por soulcore (incluindo pendentes)
        if (existing.length >= 5) {
            return false;
        }

        const field = approvalRequired ? 'pending' : 'party';
        await updateDoc(docRef, {
            [field]: arrayUnion(charInfo)
        });
        return true;
    } catch (error) {
        console.error('Erro ao aplicar para vaga:', error);
        return false;
    }
};

export const respondToApplication = async (adId, applicantId, accept) => {
    const docRef = doc(db, 'bossAds', adId);
    const snap = await getDoc(docRef);
    if (!snap.exists()) return;
    const data = snap.data();
    const pending = (data.pending || []);
    const applicant = pending.find(p => p.userId === applicantId);
    if (!applicant) return;
    const updatedPending = pending.filter(p => p.userId !== applicantId);
    const updatedParty = accept ? [...(data.party || []), applicant] : (data.party || []);
    await updateDoc(docRef, { pending: updatedPending, party: updatedParty });
};

export const removeApplication = async (adId, userId) => {
    try {
        const docRef = doc(db, 'bossAds', adId);
        const snap = await getDoc(docRef);
        if (!snap.exists()) return false;
        const data = snap.data();
        const updatedParty = (data.party || []).filter(p => p.userId !== userId);
        const updatedPending = (data.pending || []).filter(p => p.userId !== userId);
        await updateDoc(docRef, { party: updatedParty, pending: updatedPending });
        return true;
    } catch (error) {
        console.error('Erro ao remover aplicação:', error);
        return false;
    }
};

export const deleteAd = async (adId) => {
    try {
        const docRef = doc(db, 'bossAds', adId);
        await deleteDoc(docRef);
        return true;
    } catch (error) {
        console.error('Erro ao deletar anúncio:', error);
        return false;
    }
};

