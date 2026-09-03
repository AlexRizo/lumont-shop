import { Link } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import { LogIn, ShoppingCart } from 'lucide-react'
import { Profile } from './profile'
import type { User } from '@prisma/client'

interface Props {
  user: User | null
}

export const Header = ({ user }: Props) => {
  return (
    <header className="bg-white shadow p-6">
      <nav className="container mx-auto flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">LuMont Store</h1>
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
                <Profile
                  name="Diego Lopez"
                  avatar="https://github.com/devalowee.png"
                />
              </Link>
            ) : (
              <Link to='/auth/signin'>
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
