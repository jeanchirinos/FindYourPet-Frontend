'use client'
import { SWRKey } from '@/enums'
import { useGetData } from '@/hooks/useGetData'
import { useSendData } from '@/hooks/useSendData'
import { SetOptional } from 'type-fest'

export interface Category {
  id: number
  name: string
  image: string
}

export function useCategories() {
  const { data: categories, ...rest } = useGetData<Category[]>('category', {
    key: SWRKey.CATEGORIES,
  })

  return {
    categories,
    ...rest,
  }
}

export type TUpserCategory = SetOptional<Category, 'id'>

export function useUpsertCategory(category: TUpserCategory) {
  const { trigger, isMutating } = useSendData<TUpserCategory>('category-upsert', {
    key: SWRKey.CATEGORIES,
  })

  // function handleUpsert({ onSuccess }: { onSuccess?: () => void }) {
  //   trigger(category, {
  //     // optimisticData(currentData: Category[] = []) {
  //     //   const auxCategories = structuredClone(currentData)

  //     //   auxCategories.unshift(category)

  //     //   return auxCategories
  //     // },
  //     onSuccess,
  //     populateCache: false,
  //     // revalidate: false,
  //   })
  // }

  function handleUpsert({ onSuccess }: { onSuccess?: () => void }) {
    trigger(category, {
      onSuccess,
      populateCache: false,
    })
  }

  return { handleUpsert, isMutating }
}

export function useDeleteCategory(id: number) {
  const { trigger } = useSendData<{ id: number }>('category-delete', {
    key: SWRKey.CATEGORIES,
  })

  function handleDelete() {
    trigger(
      { id },
      {
        populateCache: false,
      },
    )
  }

  return { handleDelete }
}
