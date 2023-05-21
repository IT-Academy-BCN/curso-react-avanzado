import { FC } from 'react'
import type { TColumn } from './types'

type TTableHeader = {
  columns: TColumn[]
}

export const TableHeader: FC<TTableHeader> = ({ columns }) => (
  <thead>
    <tr>
      {columns.map((c) => (
        <td key={c.id}>{c.name}</td>
      ))}
    </tr>
  </thead>
)
