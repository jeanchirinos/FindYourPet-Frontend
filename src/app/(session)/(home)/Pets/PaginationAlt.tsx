// import { Pagination } from '@nextui-org/react'

// export function PaginationAlt() {
//   return (
//     <div className='flex flex-col gap-5'>
//       <Pagination
//         total={10}
//         color='secondary'
//         showControls
//         onChange={page => console.log({ page })}
//       />
//       {/* <div className='flex gap-2'>
//         <Button
//           size='sm'
//           variant='flat'
//           color='secondary'
//           onPress={() => setCurrentPage(prev => (prev > 1 ? prev - 1 : prev))}
//         >
//           Previous
//         </Button>
//         <Button
//           size='sm'
//           variant='flat'
//           color='secondary'
//           onPress={() => setCurrentPage(prev => (prev < 10 ? prev + 1 : prev))}
//         >
//           Next
//         </Button>
//       </div> */}
//     </div>
//   )
// }

'use client'
import { LinkSearchParams } from '@/components/LinkSearchParams'
import { IconBack, IconForward } from '@/icons'
import { Pagination, PaginationItemRenderProps, PaginationItemType } from '@nextui-org/react'
import { twJoin } from 'tailwind-merge'

type Props = {
  currentPage: string | number
  numberOfPages: number
}

export function PaginationAlt(props: Props) {
  if (props.numberOfPages === 1) return null

  const renderItem = ({ ref, key, value, className }: PaginationItemRenderProps) => {
    if (value === PaginationItemType.PREV) {
      if (props.currentPage.toString() === '1') return null

      return (
        <LinkSearchParams
          key={key}
          aria-label='Anterior página'
          searchParamKey='page'
          searchParamValue={Number(props.currentPage) - 1}
          className={twJoin(className, 'size-9 min-w-0 p-0')}
        >
          <IconBack />
        </LinkSearchParams>
      )
    }

    if (value === PaginationItemType.NEXT) {
      if (props.currentPage.toString() === props.numberOfPages.toString()) return null

      return (
        <LinkSearchParams
          key={key}
          aria-label='Siguiente página'
          searchParamKey='page'
          searchParamValue={Number(props.currentPage) + 1}
          className={twJoin(className, 'size-9 min-w-0 p-0')}
        >
          <IconForward />
        </LinkSearchParams>
      )
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <button key={key} className={twJoin(className, '!size-9 !min-w-0 !p-0')}>
          ...
        </button>
      )
    }

    return (
      <LinkSearchParams
        key={key}
        itemRef={ref as any}
        searchParamKey='page'
        searchParamValue={value}
        currentParam={props.currentPage.toString()}
        className='!size-9 min-w-0 !p-0'
      >
        {value}
      </LinkSearchParams>
    )
  }

  return (
    <Pagination
      showControls
      total={props.numberOfPages}
      initialPage={Number(props.currentPage)}
      className='m-0 mx-auto py-0.5'
      renderItem={renderItem}
    />
  )
}
