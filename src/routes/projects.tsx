import AppLayout from '@/components/AppLayout';
import Divider from '@/components/Divider';
import Projects from '@/components/Projects';
import { useRepos } from '@/hooks/useRepos';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: repos, isError: reposError } = useRepos();

  const githubLink = () => {
    window.location.href = import.meta.env.VITE_BACKEND_URL + "/github/install"
  }

  return (
    <AppLayout>
      <div>
        <div className='my-8'>
          <Divider text='Projects' />
        </div>
        <Projects projects={repos || []} emptyAction={githubLink} />
      </div>
    </AppLayout>
  );
}
