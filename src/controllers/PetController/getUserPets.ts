'use server'

import { Pet } from '@/models/Pet'
import { Paginate } from '@/models/utils'
import { SearchParamsProps } from '@/types'
import { getData } from '@/utilities/actionRequest'
import { getApiUrl } from '@/utilities/request'
import { DEFAULT_PET_PUBLISHED } from './constants'

export type GetUserPetsParams = SearchParamsProps<'page' | 'published'>

export async function getUserPets(params: GetUserPetsParams) {
  const { published = DEFAULT_PET_PUBLISHED } = params
  const limit = '12'

  const searchParams = new URLSearchParams({ ...params, published }).toString()

  const url = getApiUrl(`pet-user/${limit}`)
  url.search = searchParams

  const data = await getData<Paginate<Pet>>(url, {
    next: {
      tags: ['user-posts', 'pets-list'],
    },
    auth: true,
  })

  return data
}
