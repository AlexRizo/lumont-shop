import { Link } from "@tanstack/react-router"

export const Header = () => {
  return (
    <header className="bg-white shadow p-6">
      <nav className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold">LuMont Store</h1>
        <div role="navigation">
          <Link to="/">Inicio</Link>
          <Link to="/products">Productos</Link>
          <a href="https://lumont.mx" target="_blank">Serviciosa</a>
          <Link to="/cart">Carrito</Link>
        </div>
      </nav>
    </header>
  )
}
