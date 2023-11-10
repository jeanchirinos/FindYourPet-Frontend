'use client'

import { createPet } from '@/serverActions/pet'
import { Textarea } from '@nextui-org/react'
import { SubmitButton } from '@/components/SubmitButton'
import { Input } from '@/components/Input'
import { PetImage } from './client_components'
import { useFormAction } from '@/hooks/useFormAction'

type Props = {
  StatusComponent: React.ReactNode
  CategoryComponent: React.ReactNode
  PlaceComponent: React.ReactNode
}

export function Form(props: Props) {
  const { StatusComponent, CategoryComponent, PlaceComponent } = props

  const { formAction } = useFormAction(createPet)

  // RENDER
  return (
    <form action={formAction} className='flex gap-4 max-md:flex-col'>
      <PetImage />
      <section className='flex flex-col gap-y-3'>
        {StatusComponent}
        <Textarea
          name='description'
          label='Descripción'
          isRequired
          className='w-[400px] max-w-full'
        />
        <Input label='Ubicación' isRequired={false} name='location' />
        {CategoryComponent}
        {PlaceComponent}

        <SubmitButton>Publicar</SubmitButton>
      </section>
    </form>
  )
}
