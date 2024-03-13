'use server'

import { Pet } from '@/models/Pet'
import { getData } from '@/utilities/actionRequest'

export async function getMorePets(id: number) {
  const data = await getData<{ morePets: Pet[] }>(`more-pets/${id}`, {
    cache: 'no-store',
  })

  return data
}
