import { useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Breed } from '@/models/Breed'

export function useFilterBreedsClient(breeds: Breed[]) {
  // STATES
  const [query, setQuery] = useState('')

  // HOOKS
  const { replace } = useRouter()
  const searchParams = useSearchParams()

  const breed_id = searchParams.get('breed_id')

  // EFFECTS
  const selectedBreeds = useMemo(() => {
    const filteredBreeds = breeds.filter(breed => breed_id?.includes(breed.id.toString()))

    return filteredBreeds
  }, [breed_id, breeds])

  // VALUES
  const filteredBreeds =
    query === ''
      ? breeds
      : breeds.filter(breed =>
          breed.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        )

  // FUNCTIONS
  function handleChange(newBreeds: typeof breeds) {
    const newSearchParams = new URLSearchParams(searchParams)

    if (newBreeds.length) {
      newSearchParams.set('breed_id', newBreeds.map(nb => nb.id).join(','))
    } else {
      newSearchParams.delete('breed_id')
    }

    setQuery('')
    replace('?' + newSearchParams.toString())
  }

  function handleRemove(item: (typeof breeds)[0]) {
    const newSearchParams = new URLSearchParams(searchParams)

    const filteredBreeds = selectedBreeds.filter(b => b.id !== item.id)

    if (filteredBreeds.length === 0) {
      newSearchParams.delete('breed_id')
    } else {
      newSearchParams.set('breed_id', filteredBreeds.map(b => b.id).join(','))
    }

    replace('?' + newSearchParams.toString())
  }

  return {
    selectedBreeds,
    filteredBreeds,
    query,
    setQuery,
    handleChange,
    handleRemove,
  }
}
