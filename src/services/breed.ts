'use client'
import { useGetData } from '@/hooks/useGetData'
// import { request } from '@/utilities'
// import useSWR from 'swr'

export interface BreedsData {
  id: number
  name: string
  breeds: {
    id: number
    name: string
    category_id: number
  }[]
}

// async function getBreeds(id: number) {
//   return request<BreedsData>(`breedList/${id}`)
// }

export function useBreeds(id: number | undefined) {
  // const { data: breeds, ...rest } = useSWR('breeds', () => getBreeds(id), {
  //   revalidateIfStale: false,
  //   revalidateOnFocus: false,

  // })

  const { data: breedsData, ...rest } = useGetData<BreedsData>(`breedList/${id}`, {
    // key: SWRKey.BREEDS,
    key: id?.toString(),
    waitFor: [Boolean(id)],
  })

  return {
    breeds: breedsData?.breeds,
    ...rest,
  }
}
