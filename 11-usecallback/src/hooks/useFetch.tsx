import { useEffect, useState } from 'react'

export const useFetch = <T,>(url: string) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)
  const [data, setData] = useState<T>()

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((d: T) => {
        setData(d)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [url])

  return { loading, error, data }
}
