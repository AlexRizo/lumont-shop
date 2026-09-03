import { Header } from '#/components/layout/header'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_shop')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Header user={null} />
      <Outlet />
    </div>
  )
}
