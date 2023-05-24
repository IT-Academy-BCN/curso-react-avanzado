import { FC } from 'react'
import { TTable } from './types'

type TTableBody = TTable

export const TableBody: FC<TTableBody> = ({ columns, data }) => (
  <tbody>
    {data.map((d) => (
      <tr key={d.id}>
        {columns.map((c) => (
          <td key={c.id}>{d[c.id]}</td>
        ))}
      </tr>
    ))}
  </tbody>
)
