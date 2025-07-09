import React, { useContext } from 'react';
import { NotificationContext } from '../../../context/NotificationContext';

const NotificationCenter = () => {
  const { notifications, respond, minimized, setMinimized } = useContext(NotificationContext);

  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className="fixed bottom-4 right-4 bg-accent text-white px-2 py-1 rounded z-50"
      >
        Mostrar notificações
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      <button
        onClick={() => setMinimized(true)}
        className="self-end text-white text-sm"
      >
        Minimizar
      </button>
      {notifications.map((n) => (
        <div key={n.id} className="bg-white text-black p-3 rounded shadow-lg w-72 flex flex-col">
          <p className="mb-2 text-sm text-black">
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
