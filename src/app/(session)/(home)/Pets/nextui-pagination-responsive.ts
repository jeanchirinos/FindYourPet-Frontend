import { PaginationItemRenderProps } from '@nextui-org/react'

export function nextUiPaginationResponsive(
  params: PaginationItemRenderProps,
): 'dots' | 'hidden' | undefined {
  const { activePage, index, total } = params

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
