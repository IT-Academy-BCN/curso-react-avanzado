import { FC, SelectHTMLAttributes } from 'react'

export type TOption = {
  value: string
  label: string
}

export type TSelect = SelectHTMLAttributes<HTMLSelectElement> & {
  options: TOption[]
  id: string
  name: string
}

export const Select: FC<TSelect> = ({ options, name, id, ...rest }) => (
  <select name={name} id={id} {...rest}>
    <option value="">--Please choose an option--</option>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
)
