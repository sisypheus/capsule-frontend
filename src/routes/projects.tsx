import AppLayout from '@/components/AppLayout';
import Divider from '@/components/Divider';
import Pagination from '@/components/Pagination';
import Projects from '@/components/Projects';
import { getRepos } from '@/features/repo/api';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/projects')({
  component: RouteComponent,
})

type Repo = {
  id: string | number;
  name: string;
  imageUrl?: string;
  lastInvoice?: { date?: string; dateTime?: string };
  private?: boolean;
};

function RouteComponent() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 12;

  const githubLink = () => {
    window.location.href = import.meta.env.VITE_BACKEND_URL + "/github/install"
  }

  const queryClient = useQueryClient();

  const {
    data: repos,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['repos', page, perPage],
    queryFn: () => getRepos(page, perPage),
    staleTime: 1000 * 60 * 2,
  });

  if (isError) {
    return <div className="p-6 text-red-600">Error loading projects: {(error as any)?.message ?? String(error)}</div>;
  }

  useEffect(() => {
    
  }, [search])

  // Normalize the API response into an items array and total / totalPages if available
  const items: Repo[] = Array.isArray(repos)
    ? (repos as any[])
    : (repos && (repos as any).items) || (repos && (repos as any).repos) || [];

  const total: number | undefined = repos && typeof repos === 'object' && 'total' in repos ? (repos as any).total : undefined;
  const totalPages: number | undefined =
    repos && typeof repos === 'object' && 'totalPages' in repos ? (repos as any).totalPages : total ? Math.ceil(total / perPage) : undefined;

  // TODO: get total
  return (
    <AppLayout>
      <div>
        <div className='my-8'>
          <Divider text='Projects' />
        </div>
        <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
          <div className="w-full max-w-lg lg:max-w-xs">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="search"
                name="search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <Projects
          projects={repos}
          emptyAction={githubLink}
          show={perPage}
          isLoading={isLoading}
          footer={
            <Pagination
              current={page}
              total={repos?.length}
              onChange={(p: number) => setPage(p)}
            />
          }
        />
      </div>
    </AppLayout>
  );
}
