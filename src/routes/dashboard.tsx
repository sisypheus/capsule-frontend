import { createFileRoute } from '@tanstack/react-router'
import { useDeployments } from '@/hooks/useDeployments';
import { CreateDeploymentForm } from '@/components/CreateDeploymentForm';

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  const { data: deployments, isLoading, isError } = useDeployments();

  if (isLoading) return <div>Chargement de vos déploiements...</div>;
  if (isError) return <div>Erreur lors du chargement des données.</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <CreateDeploymentForm />
      <h2>Mes Déploiements</h2>
      {deployments && deployments.length > 0 ? (
        <ul>
          {deployments.map((dep) => (
            <li key={dep.id}>
              <strong>{dep.image_name}</strong> - Statut: {dep.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>Vous n'avez aucun déploiement pour le moment.</p>
      )}
    </div>
  );
};