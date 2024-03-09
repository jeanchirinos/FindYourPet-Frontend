'use server'

import { StatusList } from '@/models/Pet'
import { getData } from '@/utilities/actionRequest'

export async function getStatusList() {
  const data = await getData<StatusList>('pet-status', { cache: 'force-cache' })

  return data
}
