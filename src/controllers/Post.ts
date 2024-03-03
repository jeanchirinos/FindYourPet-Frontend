'use server'

import { Pet } from '@/models/Pet'
import { Paginate } from '@/models/Post'
import { actionRequestGet, sendData } from '@/utilities/actionRequest'
import { getApiUrl } from '@/utilities/request'
import { notFound } from 'next/navigation'
import { z } from 'zod'

export type TGetPetParams = Partial<{
  page: string
  published: string
  order: string
}>

export async function getPosts(params: TGetPetParams) {
  const { page, order, published } = params
  const limit = '12'

  const url = getApiUrl('pet-user')

  url.pathname += `/${limit}`

  page && url.searchParams.set('page', page)
  published && url.searchParams.set('published', published)
  order && url.searchParams.set('order', order)

  const data = await actionRequestGet<Paginate<Pet>>(url, {
    cache: 'no-store',
    next: {
      tags: ['user-posts', 'pets-list'],
    },
    auth: true,
  })

  const { current_page, data: posts } = data

  if (posts.length === 0 && current_page !== 1) {
    notFound()
  }

  return data
}

export async function deletePost(prevState: any, formData: FormData) {
  const schema = z.object({
    id: z.string(),
  })

  return sendData({
    url: `pet-delete/${formData.get('id')}`,
    schema,
    body: formData,
    revalidateTagParams: ['pets-list'],
  })
}
