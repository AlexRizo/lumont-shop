import { productsQueryOptions } from '#/hooks/queries/products.queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_shop/')({
  component: Home,
  loader: ({ context }) => {
    return context.queryClient.query({
      ...productsQueryOptions({ page: 1, pageSize: 20 }),
      staleTime: 'static',
    })
  },
})

function Home() {
  const { data } = useSuspenseQuery(
    productsQueryOptions({ page: 1, pageSize: 20 }),
  )

  return (
    <section>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  )
}
