import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Breed } from '@/models/Pet'

export function useFilterBreedsClient(breeds: Breed[]) {
  // STATES
  const [selectedBreeds, setSelectedBreeds] = useState<Breed[]>([])
  const [query, setQuery] = useState('')

  // HOOKS
  const { replace } = useRouter()
  const searchParams = useSearchParams()

  const breed_id = searchParams.get('breed_id')

  // EFFECTS
  useEffect(() => {
    const filteredBreeds = breeds.filter(breed =>
      breed_id?.split(',').includes(breed.id.toString()),
    )

    setSelectedBreeds(filteredBreeds)
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
  function handleChange(value: typeof breeds) {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('breed_id', value.map(v => v.id).join(','))

    setSelectedBreeds(value)
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
