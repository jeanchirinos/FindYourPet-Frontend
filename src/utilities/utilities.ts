import { ROUTE } from '@/routes'
import { redirect } from 'next/navigation'

/** Simulate a delay for async operations */
export async function waitFor(seconds: number) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}

export function getFormEntries(formData: FormData) {
  return Object.fromEntries(formData.entries())
}

export function notAuthorized() {
  return redirect(ROUTE.PETS.INDEX)
}
