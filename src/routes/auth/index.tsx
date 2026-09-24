import { Spinner } from '#/components/ui/spinner'
import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/')({
  component: RouteComponent,
  pendingComponent: () => <Spinner />,
})

function RouteComponent() {
  return <Navigate to="/auth/signin" />
}
