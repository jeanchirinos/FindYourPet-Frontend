'use server'

import { Pet } from '@/models/Pet'
import { getData } from '@/utilities/actionRequest'

export async function getPetByIdEdit(id: string) {
  const data = await getData<Pet>(`pet-edit/${id}`, {
    auth: true,
  })

  return data
}
