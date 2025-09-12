import AppLayout from '@/components/AppLayout'
import DeployForm from '@/components/DeployForm'
import { getRepos } from '@/features/repo/api'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute, useLocation, useMatch, useMatchRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/deploy')({
  component: RouteComponent,
})

function RouteComponent() {
  const location = useLocation()
  const [project, setProject] = useState(location.state?.project)
  console.log(location.state)
  // get user
  const queryClient = useQueryClient();


  const perPage = 10
  const {
    data: repos,
    // isLoading,
    // isError,
    // error,
  } = useQuery({
    queryKey: ['repos', 1, perPage],
    queryFn: () => getRepos(1, perPage),
    staleTime: 1000 * 60 * 2,
  });

  return (
    <AppLayout>
      <DeployForm projectProp={project} user={null}/>

    </AppLayout>
  )
}
