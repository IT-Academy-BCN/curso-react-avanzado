import styled from 'styled-components'

type TFlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse'
type TFlexJustify =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
type TFlexAlign = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
type TFlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse'

type TFlex = {
  direction?: TFlexDirection
  justify?: TFlexJustify
  align?: TFlexAlign
  wrap?: TFlexWrap
}

export const Flex = styled.div<TFlex>`
  display: flex;
  flex-direction: ${(props) => props.direction || 'column'};
  justify-content: ${(props) => props.justify || 'flex-start'};
  align-items: ${(props) => props.align || 'flex-start'};
  flex-wrap: ${(props) => props.wrap || 'nowrap'};
`
