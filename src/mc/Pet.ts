import { BreedsData, PetPaginate } from '@/types'
import { requestNew } from '@/utilities/request'

export async function getPets({ page = '1', limit = '2' }) {
  // const res = await requestNew<PetPaginate>(`pet/${limit}?page=${page}`)
  const res = await fetch(`http://api-encuentratumascota.nijui.com/api/pet/${limit}?page=${page}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  const data = (await res.json()) as PetPaginate

  return data
}

export async function getBreeds() {
  const res = await requestNew<BreedsData>('breedList', { cache: 'force-cache' })

  return res.data
}
