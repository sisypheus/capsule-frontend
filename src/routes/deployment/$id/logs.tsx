import { useState, useEffect, useRef } from 'react';
import { createFileRoute } from '@tanstack/react-router'
import { io, Socket } from 'socket.io-client';

export const Route = createFileRoute('/deployment/$id/logs')({
  component: LogPage,
})

function LogPage() {
  const { id } = Route.useParams();
  const [logs, setLogs] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(import.meta.env.VITE_BACKEND_URL)
    const socket = io(import.meta.env.VITE_BACKEND_URL, {
      withCredentials: true,
    });
    console.log(socket)
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log("hre")
      setIsConnected(true);
      socket.emit('joinDeploymentRoom', id);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('logMessage', (message: string) => {
      console.log("received message", message)
      setLogs((prevLogs) => [...prevLogs, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [id]);

  useEffect(() => {
    logContainerRef.current?.scrollTo(0, logContainerRef.current.scrollHeight);
  }, [logs]);

  return (
    <div>
      <h1>Logs pour le déploiement {id}</h1>
      <p>Statut de la connexion : {isConnected ? 'Connecté' : 'Déconnecté'}</p>
      <div
        ref={logContainerRef}
        style={{
          height: '600px',
          overflowY: 'scroll',
          backgroundColor: '#282c34',
          color: '#abb2bf',
          fontFamily: 'monospace',
          padding: '10px',
          whiteSpace: 'pre-wrap',
        }}
      >
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>
    </div>
  );
};

export default LogPage;