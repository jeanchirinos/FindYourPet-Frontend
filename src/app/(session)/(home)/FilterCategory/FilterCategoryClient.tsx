'use client'
import { twJoin } from 'tailwind-merge'
import { Category } from '@/models/Pet'
import { useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@nextui-org/react'

type Props = { categoryList: Category[] }

export function FilterCategoryClient(props: Props) {
  const searchParams = useSearchParams()
  const category = searchParams.get('category_id')

  const createQueryString = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams)

      if (id === category) {
        params.delete('category_id')
      } else {
        params.set('category_id', id)
      }

      params.delete('breed_id')
      params.delete('page')

      return '?' + params.toString()
    },
    [searchParams, category],
  )

  const isSelected = (id: number) => id.toString() === category

  return (
    <div className='grid w-full grid-cols-2 gap-2'>
      {props.categoryList.map(item => (
        <Button
          as={Link}
          key={item.id}
          href={createQueryString(item.id.toString())}
          className={twJoin(
            isSelected(item.id)
              ? 'bg-orange-100 text-orange-600'
              : 'bg-transparent hover:bg-foreground-100',
            'h-fit cursor-pointer flex-col justify-start gap-y-0.5  rounded-md border border-foreground-300 p-1 text-center flex-center',
          )}
          replace
        >
          <div className='*:size-4' dangerouslySetInnerHTML={{ __html: item.image }} />
          <span>{item.name}</span>
        </Button>
      ))}
    </div>
  )
}
