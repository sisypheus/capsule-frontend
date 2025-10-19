import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/Button'
import { SlimLayout } from '@/components/SlimLayout'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})


function RouteComponent() {
  const handleLogin = () => {
    window.location.href = import.meta.env.VITE_BACKEND_URL + '/auth/github/login';
  };

  return (
    <SlimLayout>
      <div className="flex">
        <Link to="/" aria-label="Home">
          <img
            alt="Capsule logo"
            src="/images/logo.png"
            className="h-10 w-auto block"
          />
        </Link>
      </div>
      <div className='my-8'>
        <h2 className="text-lg font-semibold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-sm text-gray-700">
          Sign in with github to deploy your projects
        </p>
      </div>
      <Button onClick={handleLogin} variant='solid' color='blue' className='w-full'>
        <span>
          Sign in with github
        </span>
      </Button>
    </SlimLayout>
  )
}
