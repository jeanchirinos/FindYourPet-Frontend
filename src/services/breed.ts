'use client'
import { request } from '@/utilities'
import useSWR from 'swr'

interface BreedsData {
  id: number
  name: string
  breeds: {
    id: number
    name: string
    category_id: number
  }[]
}

async function getBreeds(id: number) {
  return request<BreedsData>(`breedList/${id}`)
}

export function useBreeds(id: number) {
  const { data: breeds, ...rest } = useSWR('breeds', () => getBreeds(id), {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  })

  return {
    breeds,
    ...rest,
  }
}
