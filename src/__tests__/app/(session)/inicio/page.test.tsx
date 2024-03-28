import { render, screen } from '@testing-library/react'
import Page from '@/app/(session)/inicio/page'
import { ROUTE } from '@/routes'

describe('Page', () => {
  it('renders link that redirects to pets page', () => {
    render(<Page />)

    const link = screen.getByRole('link', { name: 'Ver mascotas' })
    expect(link).toHaveAttribute('href', ROUTE.PETS.INDEX)
  })
})
