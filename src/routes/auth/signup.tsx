import { SignUpForm } from '#/components/auth/signup-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SignUpForm />
}
