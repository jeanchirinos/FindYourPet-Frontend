'use server'

import { Paginate, Post } from '@/models/Post'
import { actionRequestGet, sendData } from '@/utilities/actionRequest'
import { getApiUrl } from '@/utilities/request'
import { notFound } from 'next/navigation'
import { z } from 'zod'

export type TGetPetParams = Partial<{
  page: string
  type: string
  order: string
}>

export async function getPosts(params: TGetPetParams) {
  const { page, order, type } = params
  const limit = '10'

  const url = getApiUrl('post')

  url.pathname += `/${limit}`

  page && url.searchParams.set('page', page)
  type && url.searchParams.set('type', type)
  order && url.searchParams.set('order', order)

  const data = await actionRequestGet<Paginate<Post>>(url, {
    cache: 'no-store',
    next: {
      tags: ['post'],
    },
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
    revalidateTagParams: ['post'],
  })
}
