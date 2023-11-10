import { BreedsData } from '@/types'
import { requestNew } from '@/utilities/request'

export async function getBreeds() {
  const res = await requestNew<BreedsData>('breedList', { cache: 'force-cache' })

  return res.data ?? []
}
