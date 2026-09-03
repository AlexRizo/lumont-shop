import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
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
