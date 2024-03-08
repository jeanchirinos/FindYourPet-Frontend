'use server'

import { sendData } from '@/utilities/actionRequest'

import { z } from 'zod'

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
