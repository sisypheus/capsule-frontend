import { createFileRoute } from '@tanstack/react-router'
import { useDeployments } from '@/hooks/useDeployments';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { createDeployment, type Deployment } from '@/features/deployments/api';

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  const [imageName, setImageName] = useState('nginxdemos/hello'); // Une image simple pour tester
  const queryClient = useQueryClient();
  const { data: deployments, isLoading, isError } = useDeployments();

  // if (isLoading) return <div>Chargement de vos déploiements...</div>;
  // if (isError) return <div>Erreur lors du chargement des données.</div>;

  const mutation = useMutation({
    mutationFn: createDeployment,
    onSuccess: () => {
      // Magique ! Ceci va automatiquement rafraîchir la query ['deployments']
      queryClient.invalidateQueries({ queryKey: ['deployments'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageName.trim()) {
      mutation.mutate(imageName);
    }
  };

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

      <h3>Mes Déploiements</h3>
      {/* {isLoading && <p>Chargement...</p>}
      {isError && <p>Impossible de charger les déploiements.</p>} */}
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