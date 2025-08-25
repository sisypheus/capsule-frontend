import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const handleLogin = () => {
    window.location.href = import.meta.env.VITE_BACKEND_URL + '/auth/github/login';
  };

  return (
    <div>
      <h1>Bienvenue sur votre PaaS</h1>
      <button onClick={handleLogin}>
        Se connecter avec GitHub
      </button>
    </div>
  );
};

