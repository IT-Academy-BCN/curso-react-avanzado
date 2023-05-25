import { styled } from 'styled-components'
import { Text } from './Text'

export type TLabel = {
  htmlFor: string
  children: string
  hiddenLabel?: boolean
}

const LabelStyled = styled(Text).withConfig({
  shouldForwardProp: (prop) => !['hiddenLabel'].includes(prop),
})<TLabel>`
  ${({ hiddenLabel }) =>
    hiddenLabel &&
    `
    position: absolute;
	position: absolute !important;
	width: 1px !important;
	height: 1px !important;
	padding: 0 !important;
	margin: -1px !important;
	overflow: hidden !important;
	clip: rect(0,0,0,0) !important;
	white-space: nowrap !important;
	border: 0 !important;
    `}
`

export const Label = ({ htmlFor, children, hiddenLabel = false }: TLabel) => (
  <LabelStyled as="label" htmlFor={htmlFor} hiddenLabel={hiddenLabel}>
    {children}
  </LabelStyled>
)

export default styled(Label)``
