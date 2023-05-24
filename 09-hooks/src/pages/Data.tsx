import { styled } from 'styled-components'
import { Title } from '../components/atoms'
import { Body, SubHeader } from '../components/layout'
import { Table } from '../components/organisms'
import { Container } from '../styles'

const TitleStyled = styled(Title)`
  margin-top: 0;
  margin-bottom: 0;
  font-size: 1.5rem;
`

const columns = [
  {
    id: 'id',
    name: 'ID',
  },
  {
    id: 'name',
    name: 'Nombre',
  },
  {
    id: 'email',
    name: 'Correo',
  },
]

const data = [
  {
    id: '1',
    name: 'Paco',
    email: 'paco@paco.paco',
  },
  {
    id: '2',
    name: 'Pedro',
    email: 'pedro@pedro.pedro',
  },
  {
    id: '3',
    name: 'Pablo',
    email: 'pablo@pablo.pablo',
  },
]

export function Data() {
  return (
    <Body>
      <SubHeader>
        <TitleStyled h={2}>Titulo de prueba</TitleStyled>
      </SubHeader>
      <Container>
        <Table columns={columns} data={data} />
      </Container>
    </Body>
  )
}
