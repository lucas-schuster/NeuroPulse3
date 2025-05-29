import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/dashboard/sessions`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar sessões');
        return res.json();
      })
      .then(data => setSessions(data))
      .catch(err => {
        console.error(err);
        alert('Erro ao carregar sessões. Verifique seu login.');
        navigate('/');
      });
  }, [navigate]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sessões do Terapeuta</h1>
      <pre>{JSON.stringify(sessions, null, 2)}</pre>

      {sessions.length === 0 ? (
        <p>Nenhuma sessão encontrada.</p>
      ) : (
<ul className="space-y-3">
  {sessions.map(sess => (
    <li key={sess.id} className="p-4 bg-white shadow rounded">
      <p><strong>Cliente:</strong> {sess.client?.code || "Desconhecido"}</p>
      <p><strong>Escala:</strong> {sess.scale}</p>
      <p><strong>Data:</strong> {sess.response?.created_at
        ? new Date(sess.response.created_at).toLocaleString()
        : "Sem resposta"}</p>
      <Link to={`/session/${sess.id}`} className="text-blue-600 underline">Ver detalhes</Link>
    </li>
  ))}
</ul>
      )}
    </div>
  );
};
console.log("Dashboard.jsx MONTADO");
export default Dashboard;

