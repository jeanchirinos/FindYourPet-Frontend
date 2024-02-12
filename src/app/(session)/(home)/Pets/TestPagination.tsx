'use client'

import { Pagination, PaginationItemRenderProps, PaginationItemType } from '@nextui-org/react'
import { Fragment } from 'react'
import { twJoin } from 'tailwind-merge'

const ChevronIcon = (props: any) => (
  <svg
    aria-hidden='true'
    fill='none'
    focusable='false'
    height='1em'
    role='presentation'
    viewBox='0 0 24 24'
    width='1em'
    {...props}
  >
    <path
      d='M15.5 19l-7-7 7-7'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
    />
  </svg>
)

export function TestPagination() {
  const renderItem = ({
    ref,
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    activePage,
    className,
    index,
    page,
    total,
  }: PaginationItemRenderProps) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button
          key={key}
          className={twJoin(className, 'h-8 w-8 min-w-8 bg-default-200/50')}
          onClick={onNext}
        >
          <ChevronIcon className='rotate-180' />
        </button>
      )
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button
          key={key}
          className={twJoin(className, 'h-8 w-8 min-w-8 bg-default-200/50')}
          onClick={onPrevious}
        >
          <ChevronIcon />
        </button>
      )
    }

    if (value === PaginationItemType.DOTS) {
      // Page is a number between
      return (
        <button data-hola={page} key={key} className={className} onClick={() => setPage(page)}>
          ...
        </button>
      )
    }

    function shouldBe(): 'dots' | 'hidden' | undefined {
      if (total === 6) {
        if (activePage === 1 || activePage === 2 || activePage === 3) {
          if (index === 4) return 'hidden'
          if (index === 5) return 'dots'
        }

        if (activePage === 4 || activePage === 5 || activePage === 6) {
          if (index === 2) return 'dots'
          if (index === 3) return 'hidden'
        }
      }
      if (total === 7) {
        if (activePage === 1 || activePage === 2 || activePage === 3) {
          if (index === 5) return 'dots'
          if (index === 4 || index === 6) return 'hidden'
        }

        if (activePage === 4) {
          if (index === 2) return 'dots'
          if (index === 3) return 'hidden'

          if (index === 5) return 'hidden'
          if (index === 6) return 'dots'
        }

        if (activePage === 5 || activePage === 6 || activePage === 7) {
          if (index === 2) return 'dots'
          if (index === 3 || index === 4) return 'hidden'
        }
      }

      if (total >= 8) {
        if (activePage === 1 || activePage === 2 || activePage === 3) {
          if (index === 4 || index === 5) return 'hidden'
        }

        if (activePage === 4) {
          if (index === 3 || index === 5) return 'hidden'
        }

        if (activePage === 4 && index === 2) return 'dots'

        if (activePage >= 5 && activePage <= total - 4) {
          if (index === 3 || index === 5) return 'hidden'
        }

        if (activePage === total - 3) {
          if (index === 3 || index === 5) return 'hidden'
        }

        if (activePage === total - 3 && index === 6) return 'dots'

        if (activePage >= total - 2) {
          if (index === 3 || index === 4) return 'hidden'
        }
      }
    }

    return (
      <Fragment key={key}>
        <button
          ref={ref}
          className={twJoin(
            className,
            isActive && 'bg-gradient-to-br from-indigo-500 to-pink-500 font-bold text-white',
            shouldBe() && 'max-sm:hidden',
          )}
          onClick={() => setPage(value)}
        >
          {value}
        </button>

        <button
          data-hola={page}
          onClick={() => setPage(page)}
          className={twJoin(className, shouldBe() === 'dots' ? 'sm:hidden' : 'hidden')}
        >
          ...
        </button>
      </Fragment>
    )
  }

  return (
    <Pagination
      disableCursorAnimation
      showControls
      total={8}
      initialPage={1}
      className='gap-2'
      radius='full'
      renderItem={renderItem}
      variant='light'
    />
  )
}
