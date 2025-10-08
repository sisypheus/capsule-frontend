import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useDeployments } from '@/hooks/useDeployments';
import { useRepos } from '@/hooks/useRepos';
import AppLayout from '@/components/AppLayout';
import Divider from '@/components/Divider';
import Deployments from '@/components/Deployments';
import Projects from '@/components/Projects';

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  const navigate = useNavigate();
  const { data: deployments, isLoading: isLoadingDeployments } = useDeployments();
  const { data: repos, isLoading: isLoadingProjects } = useRepos();

  const githubLink = () => {
    window.location.href = import.meta.env.VITE_BACKEND_URL + "/github/install"
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
          deployments={deployments?.deployments || []}
          show={4}
          emptyAction={deployProject}
          onShowMore={() => navigate({ to: "/deployments" })}
          isLoading={isLoadingDeployments}
        />

        <div className='my-8'>
          <Divider text='Projects' />
        </div>

        <Projects
          projects={repos?.items || []}
          emptyAction={githubLink}
          show={3}
          onShowMore={() => navigate({ to: "/projects" })}
          isLoading={isLoadingProjects}
        />
      </div>
    </AppLayout>
  );

}


