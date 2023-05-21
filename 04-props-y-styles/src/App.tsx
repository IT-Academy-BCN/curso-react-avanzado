import { Header } from './header/Header'
import { Nav } from './nav/Nav'

const links = [
  { name: 'Buscador', url: '/buscador' },
  { name: 'Datos', url: '/datos' },
  { name: 'Mi perfil', url: '/mi-perfil' },
]

export function App() {
  return (
    <Header>
      <h1>MIPISO.com.es</h1>
      <Nav links={links} />
    </Header>
  )
}
