import AppLayout from '@/components/AppLayout';
import Deployments from '@/components/Deployments';
import Divider from '@/components/Divider';
import Pagination from '@/components/Pagination';
import { getDeployments, type Deployment } from '@/features/deployments/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/deployments')({
  component: RouteComponent,
})

function RouteComponent() {
  const [page, setPage] = useState(1);
  const perPage = 5;

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: deployments,
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

  // Normalize the API response into an items array and total / totalPages if available
  const items: Deployment[] = Array.isArray(deployments)
    ? (deployments as any[])
    : (deployments && (deployments as any).items) || (deployments && (deployments as any).deployments) || [];

  const total: number | undefined = deployments && typeof deployments === 'object' && 'total' in deployments ? (deployments as any).total : undefined;
  const totalPages: number | undefined =
    deployments && typeof deployments === 'object' && 'totalPages' in deployments ? (deployments as any).totalPages : total ? Math.ceil(total / perPage) : undefined;

  // TODO: get total
  return (
    <AppLayout>
      <div>
        <div className='my-8'>
          <Divider text='Deployments' />
        </div>
        <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
        </div>
        <Deployments
          deployments={deployments}
          emptyAction={() => navigate({ to: "/projects" })}
          show={perPage}
          isLoading={isLoading}
          footer={
            <Pagination
              current={page}
              total={deployments?.length}
              onChange={(p: number) => setPage(p)}
            />
          }
        />
      </div>
    </AppLayout>
  );
}
