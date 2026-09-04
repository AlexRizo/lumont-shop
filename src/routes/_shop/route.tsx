import { Header } from '#/components/layout/header'
import { sessionQueryOptions } from '#/hooks/queries/session.queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_shop')({
  loader: ({ context }) =>
    context.queryClient.query({
      ...sessionQueryOptions(),
      staleTime: 'static',
    }),
  component: RouteComponent,
})

function RouteComponent() {
  const { data: user } = useSuspenseQuery(sessionQueryOptions())
  
  return (
    <div>
      <Header user={user} />
      <Outlet />
    </div>
  )
}
