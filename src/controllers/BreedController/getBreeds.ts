'use server'

import { BreedsData } from '@/models/Breed'
import { getData } from '@/utilities/actionRequest'

export async function getBreeds() {
  const data = await getData<BreedsData>('breedList', { cache: 'force-cache' })

  return data
}
