import { getCurrentUserFn } from '#/server/modules/auth/auth.functions'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
  beforeLoad: async () => {
    const user = await getCurrentUserFn()

    if (user && !user.isAnonymous) {
      throw redirect({ to: '/' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="flex flex-row h-screen">
      <aside className="flex flex-1 h-full bg-primary"></aside>

      <div className="flex flex-1 h-full items-center justify-center">
        <Outlet />
      </div>
    </main>
  )
}
