import { getGoogleData } from '@/controllers/UserController/getGoogleData'
import { GoogleForm } from './google-form'

export async function ConnectedAccounts() {
  const googleData = await getGoogleData()

  if (!googleData) return null

  return (
    <>
      <h2 className='mb-4 mt-6 text-2xl font-black'>Cuentas conectadas</h2>
      <GoogleForm {...googleData} />
    </>
  )
}
