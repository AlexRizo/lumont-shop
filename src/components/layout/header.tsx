import { Link } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import { LogIn, ShoppingCart } from 'lucide-react'
import { Profile } from './profile'
import type { Session } from '#/lib/auth'

interface Props {
  user: Session['user'] | null
}

export const Header = ({ user }: Props) => {
  return (
    <header className="bg-white shadow p-6">
      <nav className="container mx-auto flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">Store</h1>
        <div role="navigation" className="flex flex-row items-center gap-6">
          <Link to="/">Inicio</Link>
          <Link to="/products">Productos</Link>
          <a href="https://lumont.mx" target="_blank">
            Servicios
          </a>
          <div role="group" className="flex flex-row items-center gap-2">
            <Link to="/cart">
              <Button variant="outline">
                <ShoppingCart />
                Carrito
              </Button>
            </Link>
            {user ? (
              <Link to="/account">
                <Profile name={user.name} avatar={user.image} />
              </Link>
            ) : (
              <Link to="/auth/signin">
                <Button size="lg">
                  <LogIn />
                  Iniciar Sesión
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
