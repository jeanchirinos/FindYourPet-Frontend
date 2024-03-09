'use server'

import { Category } from '@/models/Pet'
import { getData } from '@/utilities/actionRequest'

export async function getCategories() {
  const data = await getData<Category[]>('category', { cache: 'force-cache' })

  return data
}
