'use client'
import { useCategoryPaginate } from '@/services/categoryPaginate'
import { Pagination } from '@nextui-org/react'
import { useEffect, useState } from 'react'

export default function Page() {
  const [page, setPage] = useState(1)
  const perPage = 2

  const { categoryPaginate } = useCategoryPaginate({ page, perPage })

  const [lastPage, setLastPage] = useState(5)

  useEffect(() => {
    if (categoryPaginate?.last_page) {
      setLastPage(categoryPaginate.last_page)
    }
  }, [categoryPaginate])

  return (
    <div className='mx-auto flex max-w-[600px] flex-col items-center gap-y-12'>
      <Pagination
        showControls
        classNames={{
          cursor: 'bg-foreground text-background',
        }}
        color='default'
        // isDisabled={hasSearchFilter}
        page={page}
        total={lastPage}
        variant='light'
        onChange={setPage}
      />
      {categoryPaginate ? (
        <div>
          {categoryPaginate.data.map(category => (
            <div key={category.id} className='flex'>
              <div
                className='[&>*]:h-5 [&>*]:w-5 [&>*]:text-gray-400'
                aria-hidden='true'
                dangerouslySetInnerHTML={{ __html: category.image }}
              />
              <h1>{category.id}</h1>
              <p>{category.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className='flex w-[200px] flex-col gap-y-2'>
          {Array.from({ length: perPage }).map((_, i) => (
            <div
              key={i}
              className='flex w-full animate-pulse rounded-md bg-gray-300 text-transparent'
            >
              <h1>{i}</h1>
              <p>{i}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
