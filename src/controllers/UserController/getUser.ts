'use server'

import { User } from '@/models/User'
import { getData } from '@/utilities/actionRequest'

export async function getUser() {
  const data = await getData<User>('user', {
    auth: true,
    next: {
      tags: ['user'],
    },
    
  })

  return data
}
