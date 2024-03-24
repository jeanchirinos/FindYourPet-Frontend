'use client'
import { LinkSearchParams } from '@/components/LinkSearchParams'
import { IconBack, IconForward } from '@/icons'
import {
  Pagination as NextUiPagination,
  PaginationItemRenderProps,
  PaginationItemType,
} from '@nextui-org/pagination'

type Props = {
  currentPage: string | number
  numberOfPages: number
}

export function Pagination(props: Props) {
  const { currentPage = '1', numberOfPages } = props

  const currentPageNumber = Number(currentPage)

  if (numberOfPages === 1) return null

  return (
    <footer className='mx-auto flex max-w-full gap-x-2'>
      <LinkSearchParams
        isDisabled={currentPageNumber === 1}
        aria-label='Anterior página'
        searchParamKey='page'
        searchParamValue={currentPageNumber - 1}
        className='size-9 min-w-0 shrink-0 p-0'
      >
        <IconBack />
      </LinkSearchParams>

      <NextUiPagination
        total={numberOfPages}
        initialPage={currentPageNumber}
        className='m-0 max-w-full p-0'
        classNames={{
          wrapper: 'overflow-x-auto max-w-full *:shrink-0 rounded-none',
        }}
        renderItem={props => renderItem({ ...props, className: 'size-9 min-w-0 p-0' })}
      />

      <LinkSearchParams
        isDisabled={currentPageNumber === numberOfPages}
        aria-label='Siguiente página'
        searchParamKey='page'
        searchParamValue={currentPageNumber + 1}
        className='size-9 min-w-0 shrink-0 p-0'
      >
        <IconForward />
      </LinkSearchParams>
    </footer>
  )
}

const renderItem = (props: PaginationItemRenderProps) => {
  const { ref, key, value, className, page } = props

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
      defaultParam='1'
      className={className}
    >
      {value}
    </LinkSearchParams>
  )
}
