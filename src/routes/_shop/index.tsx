import { Header } from '#/components/layout/header'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_shop/')({ component: Home })

function Home() {
  return (
    <h1>Holaaaa</h1>
  )
}
