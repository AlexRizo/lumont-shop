import { Button } from '#/components/ui/button'
import { authClient } from '#/lib/auth-client'
import { createFileRoute, Link } from '@tanstack/react-router'
import { MailCheck } from 'lucide-react'
import { useState } from 'react'
import z from 'zod'

const searchSchema = z.object({
  email: z.email().optional(),
})

const RESEND_COOLDOWN_SEC = 60

export const Route = createFileRoute('/auth/verify-email')({
  validateSearch: searchSchema,
  component: RouteComponent,
})

function RouteComponent() {
  const { email } = Route.useSearch()
  const [cooldown, setCooldown] = useState<number>(0)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle',
  )

  const handleResend = async () => {
    if (!email || cooldown > 0) return

    setStatus('sending')

    await authClient.sendVerificationEmail(
      {
        email,
        callbackURL: '/',
      },
      {
        onSuccess: () => {
          setStatus('sent')
          setCooldown(RESEND_COOLDOWN_SEC)

          const timer = window.setInterval(() => {
            setCooldown((prev) => {
              if (prev <= 1) {
                window.clearInterval(timer)
                return 0
              }

              return prev - 1
            })
          }, 1000)
        },
        onError: () => {
          setStatus('error')
        },
      },
    )
  }

  return (
    <div className="w-full max-w-sm flex flex-col items-center gap-6 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
        <MailCheck className="size-7 text-primary" />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Verifica tu correo</h1>
        <p className="text-sm text-muted-foreground">
          {email ? (
            <>
              Enviamos un link de verificación a{' '}
              <span className="font-medium text-foreground">{email}</span>.
              Ábrelo para activar tu cuenta.
            </>
          ) : (
            'Revisa tu bandeja de entrada y abre el link de verificación que te enviamos.'
          )}
        </p>
      </div>

      {email && (
        <div className="flex flex-col items-center gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={cooldown > 0 || status === 'sending'}
            onClick={handleResend}
          >
            {cooldown > 0
              ? `Reenviar en ${cooldown}s`
              : status === 'sending'
                ? 'Enviando...'
                : 'Reenviar correo'}
          </Button>

          {status === 'sent' && (
            <p className="text-xs text-muted-foreground">Correo reenviado.</p>
          )}
          {status === 'error' && (
            <p className="text-xs text-destructive">
              No pudimos reenviar el correo, intenta de nuevo.
            </p>
          )}
        </div>
      )}

      <Link
        to="/auth/signin"
        className="text-sm text-primary underline-offset-4 hover:underline"
      >
        Volver a iniciar sesión
      </Link>
    </div>
  )
}
