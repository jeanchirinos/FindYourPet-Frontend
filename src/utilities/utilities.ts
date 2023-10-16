import { clientRequest } from './clientRequest'

export async function swrFetcher<Response>(url: string) {
  const response = await clientRequest<Response>(url)

  if (response.status === 'success') {
    return response.data
  }
}

export async function waitFor(seconds: number) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}

export type DefaultSuccessResponse = { status: 'success'; msg: string }
