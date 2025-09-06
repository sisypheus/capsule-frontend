import { createFileRoute } from '@tanstack/react-router'
import { useDeployments } from '@/hooks/useDeployments';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { createDeployment } from '@/features/deployments/api';
import { useRepos } from '@/hooks/useRepos';
import AppLayout from '@/components/AppLayout';
import Deployments from '@/components/Deployments';
import Projects from '@/components/Projects';
import Divider from '@/components/Divider';

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
  console.log(deployments)

  return (
    <AppLayout>
      <Divider text='Deployments' />

      <div>
        {/* <form onSubmit={handleSubmit}>
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
        </form> */}
        Deployments
        <Deployments deployments={deployments} />

        {reposError &&
          // TODO: env variable
          <a href="http://localhost:3000/github/install">
            Installer l'App GitHub pour lister vos dépôts
          </a>
        }

        <Divider text='Projects' />

        <Projects projects={repos} />
      </div>
    </AppLayout>
  );

}


