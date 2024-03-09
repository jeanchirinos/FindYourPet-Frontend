'use server'

import { Pet } from '@/models/Pet'
import { Paginate } from '@/models/Post'
import { SearchParamsProps } from '@/types'
import { getData } from '@/utilities/actionRequest'
import { getApiUrl } from '@/utilities/request'
import { DEFAULT_PET_PUBLISHED } from '../defaultValues'

export type GetUserPostsParams = SearchParamsProps<'page' | 'published'>

export async function getUserPets(params: GetUserPostsParams) {
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
