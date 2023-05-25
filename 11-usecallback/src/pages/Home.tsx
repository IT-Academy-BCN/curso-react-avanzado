import { useMemo } from 'react'
import { Body, SubHeader } from '../components/layout'
import { HomeFilters } from '../components/organisms'
import { Container } from '../styles'
import { useFetch } from '../hooks/useFetch'

type THouse = {
  id: number
  district: string
  city: string
  price: number
  title: string
  image: string
}

const Houses = () => {
  const { loading, error, data } = useFetch<THouse[]>(
    'http://localhost:3004/pisos'
  )

  const filteredData = useMemo(
    () => data?.filter((h) => h.city === 'barcelona'),
    [data]
  )

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>There was an error</p>
  }

  return (
    <Container>
      {filteredData?.map((house) => (
        <div key={house.id}>
          <img src={house.image} alt={house.title} />
          <h2>{house.title}</h2>
          <p>{house.price}</p>
          <p>{house.city}</p>
        </div>
      ))}
    </Container>
  )
}

export function Home() {
  return (
    <Body>
      <SubHeader>
        <HomeFilters />
      </SubHeader>
      <Houses />
    </Body>
  )
}
