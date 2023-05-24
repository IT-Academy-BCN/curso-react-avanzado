import styled from 'styled-components'
import { Flex } from './Flex'
import { dimensions } from './dimensions'

export const Container = styled(Flex)`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${dimensions.base};
`
