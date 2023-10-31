import { clientRequest } from './clientRequest'

export async function swrFetcher<Response>(url: string) {
  const res = await clientRequest<Response>(url)

  if (res.ok) {
    return res.data
  }
}

export async function waitFor(seconds: number) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}

export function getFormEntries(formData: FormData) {
  return Object.fromEntries(formData.entries())
}
