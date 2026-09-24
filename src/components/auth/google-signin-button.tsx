import { authClient } from '#/lib/auth-client'
import { Button } from '../ui/button'

export const GoogleSignInButton = () => {
  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => {
        authClient.signIn.social({ provider: 'google', callbackURL: '/' })
      }}
    >
      <img src="/icons/google.svg" alt="Google" className="size-4" />
      Ingresar con Google
    </Button>
  )
}
