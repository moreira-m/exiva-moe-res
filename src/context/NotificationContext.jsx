import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { respondToApplication } from '../firebase/firestoreService';
import { AuthContext } from './AuthContext';
import NotificationCenter from '../components/common/Notification/NotificationCenter';

export const NotificationContext = createContext({
  notifications: [],
  respond: async () => {},
  minimized: false,
  setMinimized: () => {},
});

export const NotificationProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [adsState, setAdsState] = useState({});
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'bossAds'), where('userId', '==', user.uid));
    const unsub = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const docId = change.doc.id;
        const data = change.doc.data();
        const prev = adsState[docId] || { pending: [] };
        const newPending = data.pending || [];
        if (newPending.length > prev.pending.length) {
          const added = newPending.filter(
            (p) => !prev.pending.some((old) => old.userId === p.userId)
          );
          added.forEach((p) => {
            setNotifications((n) => [
              ...n,
              {
                id: `${docId}_${p.userId}`,
                adId: docId,
                applicant: p,
                soulCoreName: data.soulCoreName,
              },
            ]);
          });
        }
        adsState[docId] = { pending: newPending };
        setAdsState({ ...adsState });
      });
    });
    return () => unsub();
  }, [user]);

  const respond = async (adId, applicantId, accept, notifId) => {
    await respondToApplication(adId, applicantId, accept);
    setNotifications((n) => n.filter((notif) => notif.id !== notifId));
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, respond, minimized, setMinimized }}
    >
      {children}
      <NotificationCenter />
    </NotificationContext.Provider>
  );
};
