import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SessionDetail = () => {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/results/${sessionId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => setSession(data));
  }, [sessionId]);

  if (!session) return <p>Carregando...</p>;

  const respostas = session[0]?.response?.resposta_json ?? {};

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Respostas da Escala: {session[0].scale}</h2>
      <ul className="space-y-2">
        {Object.entries(respostas).map(([key, val]) => (
          <li key={key} className="bg-gray-100 p-2 rounded">
            <span className="font-semibold">{key.replace(/_/g, ' ')}:</span> {val}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SessionDetail;

