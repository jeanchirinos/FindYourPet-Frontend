'use client'
import { LinkSearchParams } from '@/components/LinkSearchParams'
import { IconBack, IconForward } from '@/icons'
import { Pagination, PaginationItemRenderProps, PaginationItemType } from '@nextui-org/pagination'
import { twJoin } from 'tailwind-merge'

type Props = {
  currentPage: string | number
  numberOfPages: number
}

export function PetPagination(props: Props) {
  const { currentPage, numberOfPages } = props

  if (numberOfPages === 1) return null

  return (
    <footer className='mx-auto flex max-w-full gap-x-2'>
      <LinkSearchParams
        isDisabled={Number(currentPage) === 1}
        aria-label='Anterior página'
        searchParamKey='page'
        searchParamValue={Number(currentPage) - 1}
        className='size-9 min-w-0 shrink-0 p-0'
      >
        <IconBack />
      </LinkSearchParams>
      <Pagination
        total={numberOfPages}
        initialPage={Number(currentPage)}
        className='m-0 max-w-full p-0'
        classNames={{
          wrapper: 'overflow-x-auto max-w-full *:shrink-0 rounded-none',
        }}
        renderItem={props => renderItem({ ...props, className: 'size-9 min-w-0 p-0' })}
      />

      <LinkSearchParams
        isDisabled={Number(currentPage) === numberOfPages}
        aria-label='Siguiente página'
        searchParamKey='page'
        searchParamValue={Number(currentPage) + 1}
        className='size-9 min-w-0 shrink-0 p-0'
      >
        <IconForward />
      </LinkSearchParams>
    </footer>
  )
}

const renderItem = (props: PaginationItemRenderProps) => {
  const { ref, key, value, className, activePage, page } = props

  // DOTS
  if (value === PaginationItemType.DOTS) {
    return (
      <LinkSearchParams
        key={key}
        aria-label={`Página ${page}`}
        searchParamKey='page'
        searchParamValue={page}
        className={className}
      >
        ...
      </LinkSearchParams>
    )
  }

  // PAGES
  return (
    <LinkSearchParams
      key={key}
      innerRef={ref as any}
      searchParamKey='page'
      searchParamValue={value}
      currentParam={activePage}
      className={twJoin(className)}
    >
      {value}
    </LinkSearchParams>
  )
}
