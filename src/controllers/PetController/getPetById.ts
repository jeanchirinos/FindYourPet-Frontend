'use server'

import { Pet } from '@/models/Pet'
import { getData } from '@/utilities/actionRequest'

export async function getPetById(id: string | number) {
  const data = await getData<{ pet: Pet }>(`pet-find/${id}`, {
    cache: 'no-store',
    authIsOptional: true,
  })

  return data
}
