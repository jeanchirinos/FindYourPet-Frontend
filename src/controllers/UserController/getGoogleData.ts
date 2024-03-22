import { getData } from '@/utilities/actionRequest'

export async function getGoogleData() {
  type Res = { isConnected: boolean; username: string | null }

  const data = await getData<Res>('user-google-data', {
    auth: true,
    redirectIfUnauthorized: false,
    next: {
      tags: ['user-google'],
    },
    nullable: true,
  })

  return data
}
