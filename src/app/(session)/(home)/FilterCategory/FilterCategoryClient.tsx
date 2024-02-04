'use client'
import { twJoin } from 'tailwind-merge'
import { Category } from '@/models/Pet'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'

type Props = { categoryList: Category[] }

export function FilterCategoryClient(props: Props) {
  const searchParams = useSearchParams()
  const category = searchParams.get('category_id')

  const [currentCategory, setCurrentCategory] = useState(category)

  useEffect(() => {
    setCurrentCategory(category)
  }, [category])

  const createQueryString = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams)

      if (id === currentCategory) {
        params.delete('category_id')
      } else {
        params.set('category_id', id)
      }

      params.delete('breed_id')
      params.delete('page')

      return '?' + params.toString()
    },
    [searchParams, currentCategory],
  )

  function handleChange(id: string) {
    if (id === currentCategory) {
      setCurrentCategory(null)
    } else {
      setCurrentCategory(id)
    }
  }

  const isSelected = (id: number) => id.toString() === currentCategory

  return (
    <div className='grid w-full grid-cols-2 gap-2'>
      {props.categoryList.map(item => (
        <Link
          key={item.id}
          href={createQueryString(item.id.toString())}
          onClick={() => handleChange(item.id.toString())}
          className={twJoin(
            isSelected(item.id) ? 'bg-orange-100 text-orange-600' : 'hover:bg-foreground-100',
            'cursor-pointer flex-col gap-y-0.5 rounded-md border border-foreground-300 p-1 text-center flex-center',
          )}
        >
          <div className='*:size-4' dangerouslySetInnerHTML={{ __html: item.image }} />
          <span>{item.name}</span>
        </Link>
      ))}
    </div>
  )
}
