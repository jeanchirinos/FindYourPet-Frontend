'use client'
import { useGetData } from '@/hooks/useGetData'
import { Category } from './category'

interface CategoryPaginateData {
  current_page: number
  data: Category[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: { url: string | null; label: string; active: boolean }[]
  next_page_url: null | string
  path: string
  per_page: string
  prev_page_url: null | string
  to: number
  total: number
}
export function useCategoryPaginate({ page = 1, perPage = 5 }: { page: number; perPage: number }) {
  const { data: categoryPaginate, ...rest } = useGetData<CategoryPaginateData>(
    `category-paginate/${perPage}?page=${page}`,
    {
      // key: SWRKey.BREEDS,
      // key: page?.toString(),
      // waitFor: [Boolean(page)],
    },
  )

  return {
    categoryPaginate,
    ...rest,
  }
}
