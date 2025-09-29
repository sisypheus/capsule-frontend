import AppLayout from '@/components/AppLayout';
import Deployments from '@/components/Deployments';
import Divider from '@/components/Divider';
import Pagination from '@/components/Pagination';
import { getDeployments } from '@/features/deployments/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react';

export const Route = createFileRoute('/deployments')({
  component: RouteComponent,
})

function RouteComponent() {
  const [page, setPage] = useState(1);
  const perPage = 15;

  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['deployments', page, perPage],
    queryFn: () => getDeployments(page, perPage),
    staleTime: 1000 * 60,
  });

  if (isError) {
    return <div className="p-6 text-red-600">Error loading projects: {(error as any)?.message ?? String(error)}</div>;
  }

  return (
    <AppLayout>
      <div>
        <div className='my-8'>
          <Divider text='Deployments' />
        </div>
        <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
        </div>
        <Deployments
          deployments={data?.deployments}
          emptyAction={() => navigate({ to: "/projects" })}
          show={perPage}
          isLoading={isLoading}
          footer={
            <Pagination
              start={((page - 1) * perPage) + 1}
              end={Math.min(((page - 1) * perPage) + perPage, data?.count)}
              current={page}
              total={data?.count}
              onChange={(p: number) => setPage(p)}
            />
          }
        />
      </div>
    </AppLayout>
  );
}
