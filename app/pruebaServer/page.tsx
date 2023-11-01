import { Category } from '@/types'
import { actionRequest } from '@/utilities/actionRequest'

export default async function Page() {
  const res = await actionRequest<Category[]>('category')

  if (!res.ok) return null

  const { data: categories } = res

  return categories.map(c => <div key={c.id}>{c.name}</div>)
}
