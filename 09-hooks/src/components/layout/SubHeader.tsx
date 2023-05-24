import { FC, ReactNode } from 'react'
import { styled } from 'styled-components'
import { Container, colors, dimensions } from '../../styles'

type TSubHeader = {
  children: ReactNode
}

const SubHeaderStyled = styled(Container)`
  background-color: ${colors.blue[100]};
  border-top: 1px solid ${colors.blue[200]};
  border-bottom: 1px solid ${colors.blue[200]};
  padding-top: ${dimensions.base};
  padding-bottom: ${dimensions.base};
`

export const SubHeader: FC<TSubHeader> = ({ children }) => (
  <SubHeaderStyled>{children}</SubHeaderStyled>
)
