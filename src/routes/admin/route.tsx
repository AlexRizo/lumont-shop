import { getCurrentUserFn } from '#/server/modules/auth/auth.functions'
import { UserRole } from '@prisma/client'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/admin')({
  beforeLoad: async ({ location }) => {
    const user = await getCurrentUserFn()

    if (!user || user.isAnonymous) {
      throw redirect({
        to: '/auth/signin',
        search: {
          redirect: location.pathname,
        },
      })
    }

    if (user.role !== UserRole.ADMIN) {
      throw redirect({
        to: '/',
      })
    }

    return {
      user,
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main>
      <Outlet />
    </main>
  )
}
