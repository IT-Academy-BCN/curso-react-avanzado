import { ReactNode } from 'react'

export type TColumn = {
  id: string
  name: string
}

export type TData = {
  id: string
} & {
  [key: string]: ReactNode
}

export type TTable = {
  columns: TColumn[]
  data: TData[]
}
