'use server'

import { sendData } from '@/utilities/actionRequest'

export async function deletePet(prevState: any, formData: FormData) {
  return sendData({
    url: `pet-delete/${formData.get('id')}`,
    revalidateTagParams: ['pets-list'],
  })
}
