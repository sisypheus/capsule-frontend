import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useDeployments } from '@/hooks/useDeployments';
import { useRepos } from '@/hooks/useRepos';
import AppLayout from '@/components/AppLayout';
import Divider from '@/components/Divider';
import Deployments from '@/components/Deployments';
import Projects from '@/components/Projects';
import api from '@/api/axios';

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
        <button onClick={
          () => api.post("/deployments", {
            project: "sisypheus/capsule-frontend",
            project_name: "sisypheus/capsule-frontend",
            branch: "main",
            dockerfile_path: "./"
          }, {withCredentials: true})
        }>
          yo
          test cd

        </button>
        <div className='my-8'>
          <Divider text='Deployments' />
        </div>
        <Deployments
          deployments={deployments || []}
          show={4}
          emptyAction={deployProject}
          onShowMore={() => navigate({ to: "/deployments" })}
          isLoading={isLoadingDeployments}
        />


        <div className='my-8'>
          <Divider text='Projects' />
        </div>

        <Projects
          projects={repos || []}
          emptyAction={githubLink}
          show={3}
          onShowMore={() => navigate({ to: "/projects" })}
          isLoading={isLoadingProjects}
        />
      </div>
    </AppLayout>
  );

}


