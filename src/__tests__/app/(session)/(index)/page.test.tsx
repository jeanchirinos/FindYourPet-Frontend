import { fireEvent, render, screen } from '@testing-library/react'
import { FilterPlace } from '@/app/(session)/(index)/components/FilterPlace/FilterPlace'

describe('Page', () => {
  it('renders link that redirects to pets page', () => {
    render(<FilterPlace />)

    // const link = screen.getByRole('insertion', { name: 'Se Busca' })

    // fireEvent.click(link)
    // const petImage = screen.getByRole('img', { name: 'Mascota' })
    // expect(petImage).toBeInTheDocument()
  })
})
