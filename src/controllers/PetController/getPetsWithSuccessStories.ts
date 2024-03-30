'use server'

import { Pet } from '@/models/Pet'
import { Paginate } from '@/models/utils'
import { SearchParamsProps } from '@/types'
import { getData } from '@/utilities/actionRequest'
import { getApiUrl } from '@/utilities/request'
import { DEFAULT_PET_WITH_SUCCESS_STORIES_STATUS } from './constants'

export type GetPetsWithSuccessStoriesParams = SearchParamsProps<'status' | 'page'>

export async function getPetsWithSuccessStories(params: GetPetsWithSuccessStoriesParams) {
  const { status = DEFAULT_PET_WITH_SUCCESS_STORIES_STATUS } = params
  const limit = '15'

  const searchParams = new URLSearchParams({ ...params, status }).toString()

  // const url = getApiUrl(`pet-success/${limit}`)
  const url = getApiUrl(`pet-success`)
  url.search = searchParams

  const data = await getData<Paginate<Pet>>(url, {
    cache: 'no-store',
    next: {
      tags: ['pet', 'pets-list'],
    },
  })

  return data
}
