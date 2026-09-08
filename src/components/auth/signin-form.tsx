import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field'
import { useForm } from '@tanstack/react-form'
import { SignInSchema } from '#/server/modules/auth/auth.schema'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { GoogleSignInButton } from './google-signin-button'
import { Separator } from '../ui/separator'
import { useState } from 'react'
import { authClient } from '#/lib/auth-client'
import { Navigate } from '@tanstack/react-router'
import { Spinner } from '../ui/spinner'
import { LogIn } from 'lucide-react'

export const SignInForm = () => {
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: SignInSchema,
    },
    onSubmit: async ({ value }) => {
      setServerError(null)

      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
          callbackURL: '/',
        },
        {
          onSuccess: () => {
            Navigate({ to: '/auth/verify-email' })
          },
          onError: (ctx) => {
            setServerError(ctx.error.message)
          },
        },
      )
    },
  })

  return (
    <section>
      <div role="heading" className="mb-6">
        <h1 className="text-4xl font-bold">¡Bienvenido!</h1>
        <p className="text-muted-foreground text-balance">
          Ingresa tus datos para crear tu cuenta
        </p>
      </div>

      <GoogleSignInButton />

      <Separator className="my-6" />

      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()

          form.handleSubmit()
        }}
        className="w-xs space-y-4.5"
      >
        <FieldGroup>
          <form.Field
            name="email"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Correo Electrónico
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="ejemplo@correo.com"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />
        </FieldGroup>
        <FieldGroup>
          <form.Field
            name="password"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Contraseña</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="********"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />
        </FieldGroup>

        {serverError && (
          <p className="text-sm text-destructive">{serverError}</p>
        )}

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSumitting]) => (
            <Button
              size="lg"
              type="submit"
              className="w-full"
              disabled={!canSubmit || isSumitting}
            >
              {isSumitting ? (
                <>
                  <Spinner />
                  <span>Creando cuenta...</span>
                </>
              ) : (
                <>
                  <LogIn />
                  <span>Registrarse</span>
                </>
              )}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </section>
  )
}
