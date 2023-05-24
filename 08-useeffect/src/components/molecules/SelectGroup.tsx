import { FC } from 'react'
import { styled } from 'styled-components'
import { Select, Label, TSelect, TLabel } from '../atoms'

type TSelectGroup = { label: string } & TSelect & Pick<TLabel, 'hiddenLabel'>

const SelectGroup: FC<TSelectGroup> = ({
  id,
  name,
  label,
  options,
  hiddenLabel,
  ...rest
}) => (
  <div>
    <Label htmlFor={id} hiddenLabel={hiddenLabel}>
      {label}
    </Label>
    <Select id={id} name={name} options={options} {...rest} />
  </div>
)

export default styled(SelectGroup)``
