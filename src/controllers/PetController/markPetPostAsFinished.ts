'use server'

import { sendData } from '@/utilities/actionRequest'
import { z } from 'zod'

export async function markPetPostAsFinished(prevState: any, formData: FormData) {
  const schema = z.object({
    finished: z.string(),
  })

  if (formData.get('finished') === 'on') {
    formData.set('finished', '1')
  } else {
    formData.set('finished', '2')
  }

  return sendData({
    url: `pet-finish/${formData.get('id')}`,
    schema,
    body: formData,
    revalidateTagParams: ['pets-list'],
  })
}
