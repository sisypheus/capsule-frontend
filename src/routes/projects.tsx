import AppLayout from '@/components/AppLayout';
import Divider from '@/components/Divider';
import Pagination from '@/components/Pagination';
import Projects from '@/components/Projects';
import { getRepos, searchRepos } from '@/features/repo/api';
import { useDebounce } from '@/hooks/useDebounce';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';

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

  const debouncedSearch = useDebounce(search, 400);
  const queryKey = ['repos', { search: debouncedSearch, page, perPage }];

  const githubLink = () => {
    window.location.href = import.meta.env.VITE_BACKEND_URL + "/github/install"
  }
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery<any>({
    queryKey: queryKey,
    queryFn: () => {
      if (debouncedSearch && debouncedSearch.length >= 3) {
        return searchRepos(debouncedSearch, page, perPage);
      }
      return getRepos(page, perPage);
    },
    staleTime: 1000 * 60 * 2,
  });

  if (isError) {
    return <div className="p-6 text-red-600">Error loading projects: {(error as any)?.message ?? String(error)}</div>;
  }

  return (
    <AppLayout>
      <div>
        <div className='my-8'>
          <Divider text='Projects' />
        </div>
        <div className="flex flex-1 items-center justify-center pt-2 pb-8 lg:ml-6 lg:justify-end">
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
          projects={data?.items}
          emptyAction={githubLink}
          show={perPage}
          isLoading={isLoading}
          footer={
            <Pagination
              current={page}
              total={data?.items?.length}
              onChange={(p: number) => setPage(p)}
            />
          }
        />
      </div>
    </AppLayout>
  );
}
