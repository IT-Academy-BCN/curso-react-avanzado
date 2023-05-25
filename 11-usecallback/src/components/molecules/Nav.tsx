import { FC } from 'react'
import { styled } from 'styled-components'
import { Text } from '../atoms'

type TNav = {
  links: {
    label: string
    url: string
  }[]
}

const NavStyled = styled.nav`
  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-left: 1rem;

      ${Text} {
        text-decoration: none;
        color: red;
      }
    }
  }
`

export const Nav: FC<TNav> = ({ links }) => (
  <NavStyled>
    <ul>
      {links.map((l) => (
        <li key={l.url}>
          <Text as="a" href={l.url}>
            {l.label}
          </Text>
        </li>
      ))}
    </ul>
  </NavStyled>
)
