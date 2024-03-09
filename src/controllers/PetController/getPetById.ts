'use server'

import { Pet } from '@/models/Pet'
import { getData } from '@/utilities/actionRequest'

export async function getPetById(id: string) {
  const data = await getData<{ pet: Pet; morePets: Pet[] }>(`pet-find/${id}`, {
    cache: 'no-store',
  })

  return data
}
