import { FC } from 'react'
import './nav.css'

type TNav = {
  links: {
    name: string
    url: string
  }[]
}

export const Nav: FC<TNav> = ({ links }) => (
  <nav>
    <ul>
      {links.map((l) => (
        <li key={l.url}>
          <a href={l.url}>{l.name}</a>
        </li>
      ))}
    </ul>
  </nav>
)
