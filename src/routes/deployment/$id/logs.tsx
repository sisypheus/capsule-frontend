import { useState, useEffect, useRef } from 'react';
import { createFileRoute, Link, notFound, useLoaderData, useLocation, useNavigate, useRouter } from '@tanstack/react-router'
import { io, Socket } from 'socket.io-client';
import AppLayout from '@/components/AppLayout';
import Divider from '@/components/Divider';
import { Button } from '@/components/Button';
import { getDeployment } from '@/features/deployments/api';
import { useUser } from '@/hooks/useUser';

export const Route = createFileRoute('/deployment/$id/logs')({
  loader: async ({ params }) => {
    const deployment = await getDeployment(params.id)
    if (!deployment)
      throw notFound;
    return params.id
  },
  component: LogPage
})

function LogPage() {
  const id = useLoaderData({ from: "/deployment/$id/logs" });
  const user = useUser()
  const router = useRouter()
  const [logs, setLogs] = useState<string[]>([]);
  const [deploymentDone, setDeploymentDone] = useState<string>("");
  const socketRef = useRef<Socket | null>(null);
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user.user)
      return;
    const socket = io(import.meta.env.VITE_BACKEND_URL, {
      withCredentials: true,
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      socket.emit('joinDeploymentRoom', id);
    });

    socket.on('logMessage', (message: string) => {
      setLogs((prevLogs) => [...prevLogs, message]);
    });

    socket.on('deploymentDone', (message: string) => {
      setDeploymentDone(message)
    });

    return () => {
      socket.disconnect();
    };
  }, [id, user.user]);

  useEffect(() => {
    logContainerRef.current?.scrollTo(0, logContainerRef.current.scrollHeight);
  }, [logs]);

  const goToPreview = () => {
    window.open(deploymentDone, "_blank")
  }

  const goBack = () => {
    router.history.back()
  }

  return (
    <div className='overflow-y-hidden'>
      <AppLayout>
        <div className='scroll-none'>
          <div className='my-8'>
            <Divider text={"Build logs"} />
          </div>
          <div
            className='bg-slate-200/10 max-h-96 min-h-96 rounded-md shadow shadow-indigo-400 ring ring-indigo-100'
            ref={logContainerRef}
            style={{
              // height: '400px',
              overflowY: 'scroll',
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
        <div className='flex w-full justify-end my-4 gap-x-2'>
          <Link to='/dashboard'>
            <Button onClick={goBack} className="cursor-pointer" variant='outline'>
              Return
            </Button>
          </Link>
          <Button onClick={goToPreview} disabled={!deploymentDone} className="disabled:cursor-wait disabled:bg-gray-400 cursor-pointer" type="solid">
            View deployment
          </Button>
        </div>
      </AppLayout >
    </div>
  );
};

export default LogPage;