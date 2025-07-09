import React, { useContext } from 'react';
import { NotificationContext } from '../../../context/NotificationContext';

const NotificationCenter = () => {
  const { notifications, respond, removeNotification } = useContext(NotificationContext);

  return (
    <div className="fixed bottom-4 right-4 flex flex-col-reverse items-end gap-2 z-50">
      {notifications.map((n) => (
        <div
          key={n.id}
          className="bg-white text-black p-3 rounded shadow-lg w-72 flex flex-col animate-slide-in relative"
        >
          <button
            onClick={() => removeNotification(n.id)}
            className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
          <p className="mb-2 text-sm">
            O {n.applicant.name} solicitou uma vaga para o soulcore de {n.soulCoreName}.
          </p>
          <div className="flex gap-2 self-end">
            <button
              onClick={() => respond(n.adId, n.applicant.userId, true, n.id)}
              className="px-2 py-1 bg-accent-green rounded"
            >
              Aceitar
            </button>
            <button
              onClick={() => respond(n.adId, n.applicant.userId, false, n.id)}
              className="px-2 py-1 bg-red-600 text-white rounded"
            >
              Recusar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationCenter;
