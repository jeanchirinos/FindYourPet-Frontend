'use server'

import { Pet } from '@/models/Pet'
import { Paginate } from '@/models/Post'
import { SearchParamsProps } from '@/types'
import { getData } from '@/utilities/actionRequest'
import { getApiUrl } from '@/utilities/request'
import { DEFAULT_PET_PUBLISHED } from '../defaultValues'

export type GetPetsAdminParams = SearchParamsProps<'page' | 'published'>

export async function getAllPetsAdmin(params: GetPetsAdminParams) {
  const { published = DEFAULT_PET_PUBLISHED } = params
  const limit = '15'

  const searchParams = new URLSearchParams({ ...params, published }).toString()

  const url = getApiUrl(`admin-pets/${limit}`)
  url.search = searchParams

  const data = await getData<Paginate<Pet>>(url, {
    next: {
      tags: ['admin-pets', 'pets-list'],
    },
    auth: true,
  })

  return data
}
