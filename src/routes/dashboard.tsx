import { createFileRoute } from '@tanstack/react-router'
import { useDeployments } from '@/hooks/useDeployments';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { createDeployment } from '@/features/deployments/api';
import { useRepos } from '@/hooks/useRepos';

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  const [imageName, setImageName] = useState('nginxdemos/hello');
  const queryClient = useQueryClient();
  const { data: deployments, isLoading, isError } = useDeployments();
  const { data: repos, isError: reposError } = useRepos();


  const mutation = useMutation({
    mutationFn: createDeployment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deployments'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageName.trim()) {
      mutation.mutate(imageName);
    }
  };

  console.log(repos)

  return (
    <div>
      <h2>Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={imageName}
          onChange={(e) => setImageName(e.target.value)}
          placeholder="ex: nginx:latest"
          disabled={mutation.isPending}
        />
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Déploiement en cours...' : 'Déployer'}
        </button>
        {mutation.isError && <p style={{ color: 'red' }}>Erreur: {mutation.error.message}</p>}
      </form>

      {reposError &&
        <a href="http://localhost:3000/github/install">
          Installer l'App GitHub pour lister vos dépôts
        </a>
      }

      <h3>Mes Déploiements</h3>
      <ul>
        {deployments?.map((dep) => (
          <li key={dep.id}>
            <strong>{dep.image_name}</strong> - Status: {dep.status}
            {dep.status === 'provisioning' && ' (création...)'}
            {dep.status === 'active' && dep.url && (
              <> - <a href={dep.url} target="_blank" rel="noopener noreferrer">Accéder à l'app</a> </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};