import { FC } from 'react'
import { styled } from 'styled-components'
import { TableHeader } from './TableHeader'
import { TTable } from './types'
import { TableBody } from './TableBody'

const TableStyled = styled.div`
  width: 100%;
  table,
  th,
  td {
    border: 1px solid;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  thead {
    font-weight: bold;
  }

  td {
    padding: 0.5rem;
  }
`

export const Table: FC<TTable> = ({ columns, data }) => (
  <TableStyled>
    <table>
      <TableHeader columns={columns} />
      <TableBody data={data} columns={columns} />
    </table>
  </TableStyled>
)
