'use client'
import { LinkSearchParams } from '@/components/LinkSearchParams'
import { IconBack, IconForward } from '@/icons'
import { Pagination, PaginationItemRenderProps, PaginationItemType } from '@nextui-org/react'
import { twJoin } from 'tailwind-merge'

type Props = {
  currentPage: string | number
  numberOfPages: number
}

export function PetPagination(props: Props) {
  if (props.numberOfPages === 1) return null

  return (
    <Pagination
      showControls
      total={props.numberOfPages}
      initialPage={Number(props.currentPage)}
      className='m-0 mx-auto py-0.5'
      renderItem={renderProps => renderItem({ ...renderProps, ...props })}
    />
  )
}

const renderItem = ({
  ref,
  key,
  value,
  className,
  currentPage,
  numberOfPages,
}: PaginationItemRenderProps & Props) => {
  // PREV
  if (value === PaginationItemType.PREV) {
    if (currentPage.toString() === '1') return null

    return (
      <LinkSearchParams
        key={key}
        aria-label='Anterior página'
        searchParamKey='page'
        searchParamValue={Number(currentPage) - 1}
        className={twJoin(className, 'size-9 min-w-0 p-0')}
      >
        <IconBack />
      </LinkSearchParams>
    )
  }

  // NEXT
  if (value === PaginationItemType.NEXT) {
    if (currentPage.toString() === numberOfPages.toString()) return null

    return (
      <LinkSearchParams
        key={key}
        aria-label='Siguiente página'
        searchParamKey='page'
        searchParamValue={Number(currentPage) + 1}
        className={twJoin(className, 'size-9 min-w-0 p-0')}
      >
        <IconForward />
      </LinkSearchParams>
    )
  }

  // DOTS
  if (value === PaginationItemType.DOTS) {
    return (
      <button key={key} className={twJoin(className, '!size-9 !min-w-0 !p-0')}>
        ...
      </button>
    )
  }

  // PAGES
  return (
    <LinkSearchParams
      key={key}
      itemRef={ref as any}
      searchParamKey='page'
      searchParamValue={value}
      currentParam={currentPage.toString()}
      className='!size-9 min-w-0 !p-0'
    >
      {value}
    </LinkSearchParams>
  )
}
