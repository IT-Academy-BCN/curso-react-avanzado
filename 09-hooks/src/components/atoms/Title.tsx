import { FC } from 'react'
import { styled } from 'styled-components'
import { Text } from './Text'

type TTitle = {
  h: 1 | 2 | 3 | 4 | 5 | 6
  children: string
}

const Title: FC<TTitle> = ({ h, children, ...rest }) => (
  <Text as={`h${h}`} {...rest}>
    {children}
  </Text>
)

export default styled(Title)``
