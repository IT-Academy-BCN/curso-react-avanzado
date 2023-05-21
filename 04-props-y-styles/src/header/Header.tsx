import { FC, ReactNode } from 'react'
import './header.css'

type THeader = {
  children: ReactNode
}

export const Header: FC<THeader> = ({ children }) => (
  <div className="header">{children}</div>
)
