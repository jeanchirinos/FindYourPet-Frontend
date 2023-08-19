'use client'
import { request } from '@/utilities'
import useSWR from 'swr'

export interface Category {
  id: number
  name: string
  image: string
}

async function getCategories() {
  return request<Category[]>('category')
}

export function useCategories() {
  const { data: categories, ...rest } = useSWR('categories', getCategories, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  })

  return {
    categories,
    ...rest,
  }
}
