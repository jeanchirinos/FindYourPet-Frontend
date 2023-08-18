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

async function getBreeds() {
  return request<BreedsData>('breedList/2')
}

export function useBreeds() {
  const { data: breeds, ...rest } = useSWR('breeds', getBreeds)

  return {
    breeds,
    ...rest,
  }
}
