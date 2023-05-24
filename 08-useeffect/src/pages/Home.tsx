import { Body, SubHeader } from '../components/layout'
import { HomeFilters } from '../components/organisms'

export function Home() {
  return (
    <Body>
      <SubHeader>
        <HomeFilters />
      </SubHeader>
    </Body>
  )
}
