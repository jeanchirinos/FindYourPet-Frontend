'use client'
import { useGetData } from '@/hooks/useGetData'

export interface BreedsData {
  id: number
  name: string
  breeds: {
    id: number
    name: string
    category_id: number
  }[]
}

export function useBreeds(id: number | undefined) {
  const { data: breedsData, ...rest } = useGetData<BreedsData>(`breedList/${id}`, {
    key: id?.toString(),
    waitFor: [Boolean(id)],
  })

  return {
    breeds: breedsData?.breeds,
    ...rest,
  }
}
