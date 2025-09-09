import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useDeployments } from '@/hooks/useDeployments';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
  const navigate = useNavigate();
  const { data: deployments, isLoading, isError } = useDeployments();
  const { data: repos, isError: reposError } = useRepos();

  const githubLink = () => {
    navigate({to: import.meta.env.VITE_BACKEND_URL + "/github/install"})
  }

  const deployProject = () => {
    navigate({ to: "/projects" })
  }

  return (
    <AppLayout>
      <div>
        <div className='my-8'>
          <Divider text='Deployments' />
        </div>
        <Deployments
          deployments={deployments || []}
          show={4}
          emptyAction={deployProject}
          onShowMore={() => navigate({ to: "/deployments" })}
        />


        <div className='my-8'>
          <Divider text='Projects' />
        </div>

        <Projects
          projects={repos || []}
          emptyAction={githubLink}
          show={3}
          onShowMore={() => navigate({ to: "/projects" })}
        />
      </div>
    </AppLayout>
  );

}


