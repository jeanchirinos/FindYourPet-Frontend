import { Category } from '@/types'
import { request } from '@/utilities/request'

export default async function Page() {
  const res = await request<Category[]>('category')

  if (!res.ok) return null

  const { data: categories } = res

  return categories.map(c => <div key={c.id}>{c.name}</div>)
}
