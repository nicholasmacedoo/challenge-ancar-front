import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'

export function Layout() {
  return (
    <div className="w-full h-screen px-8 py-6">
      <header className="flex w-full">
        <nav className="flex items-center gap-4">
          <strong className="font-mono mr-6">.ancar-quiz</strong>
          <Link to="/">Home</Link>
          <Link to="/questionarios">Questionários</Link>
          <Link to="/usuarios">Usuários</Link>
        </nav>
      </header>
      <main className="mt-8">
        <Outlet />
      </main>
    </div>
  )
}
