import { Header } from '../components/layout/header/Header'
import { Nav } from '../components/molecules/nav/Nav'

const links = [
  { name: 'Buscador', url: '/buscador' },
  { name: 'Datos', url: '/datos' },
  { name: 'Mi perfil', url: '/mi-perfil' },
]

export function Home() {
  return (
    <Header>
      <h1>MIPISO.com.es</h1>
      <Nav links={links} />
    </Header>
  )
}
