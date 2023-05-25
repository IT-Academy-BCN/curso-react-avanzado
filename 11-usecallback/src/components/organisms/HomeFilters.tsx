import { styled } from 'styled-components'
import { SelectGroup } from '../molecules'
import { Flex } from '../../styles'

const types = [
  { value: 'house', label: 'House' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'townhouse', label: 'Townhouse' },
]

const locations = [
  { value: 'barcelona', label: 'Barcelona' },
  { value: 'madrid', label: 'Madrid' },
  { value: 'valencia', label: 'Valencia' },
]

const HomeFiltersStyled = styled(Flex)`
  ${SelectGroup} {
    margin-right: 1rem;
  }
`

export const HomeFilters = () => (
  <HomeFiltersStyled justify="flex-start" direction="row">
    <SelectGroup
      label="Type"
      id="type"
      name="type"
      options={types}
      hiddenLabel
    />
    <SelectGroup
      label="Location"
      id="location"
      name="location"
      options={locations}
      hiddenLabel
    />
  </HomeFiltersStyled>
)
