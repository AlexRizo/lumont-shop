import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_shop/products/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(shop)/products/"!</div>
}
