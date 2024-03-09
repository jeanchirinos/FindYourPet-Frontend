'use server'

import { Pet } from '@/models/Pet'
import { Paginate } from '@/models/Post'
import { SearchParamsProps } from '@/types'
import { getData } from '@/utilities/actionRequest'
import { getApiUrl } from '@/utilities/request'
import { DEFAULT_PET_STATUS } from '../defaultValues'

export type GetPetsParams = SearchParamsProps<
  'page' | 'status' | 'category_id' | 'breed_id' | 'order' | 'estate' | 'city' | 'district'
>

export async function getPets(params: GetPetsParams) {
  const { status = DEFAULT_PET_STATUS } = params
  const limit = '15'

  const searchParams = new URLSearchParams({ ...params, status }).toString()

  const url = getApiUrl(`pet/${limit}`)
  url.search = searchParams

  const data = await getData<Paginate<Pet>>(url, {
    cache: 'no-store',
    next: {
      tags: ['pet', 'pets-list'],
    },
  })

  return data
}
