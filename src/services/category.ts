'use client'

import { request } from '@/utilities'
import useSWR from 'swr'

interface Category {
  id: number
  name: string
}

interface BreedsData {
  id: number
  name: string
  breeds: {
    id: number
    name: string
    category_id: number
  }[]
}

async function getCategories() {
  // return request<Category[]>('breedList/2')
  return request<BreedsData>('breedList/2')
}

export function useCategories() {
  const { data: categories, ...rest } = useSWR('categories', getCategories)

  return {
    categories,
    ...rest,
  }
}
