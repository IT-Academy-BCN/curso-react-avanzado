import { FC } from 'react'
import { styled } from 'styled-components'
import { Nav } from '../molecules'
import { mainNavigation } from '../../constants/links'
import { Container } from '../../styles'

const HeaderStyled = styled(Container)``

export const Header: FC = () => (
  <HeaderStyled direction="row" align="center" justify="space-between">
    <h1>MIPISO.com.es</h1>
    <Nav links={mainNavigation} />
  </HeaderStyled>
)
