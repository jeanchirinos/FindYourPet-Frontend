import { BreedsData } from '@/types'
import { request } from '@/utilities/request'

export async function getBreeds() {
  const res = await request<BreedsData[]>('breedList', { cache: 'force-cache' })

  return res.data ?? []
}
