import { Header } from '#/components/ui/layout/header'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="">
      <Header />
      <h1>HGolaaaaaaaaa</h1>
    </div>
  )
}
