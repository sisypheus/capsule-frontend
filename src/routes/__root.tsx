import RootLayout from '@/components/Layout'
import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <>
      <RootLayout>
        <Outlet />
      </RootLayout>
    </>
  ),
})
