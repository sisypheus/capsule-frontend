import { useUser } from '@/hooks/useUser';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const {user, loading} = useUser();
  return (
    <div>
      <p>Bonjour, {user?.email}</p>
    </div>
  )
}
