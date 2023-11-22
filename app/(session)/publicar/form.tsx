'use client'

import { Textarea } from '@nextui-org/react'
import { SubmitButton } from '@/components/SubmitButton'
import { Input } from '@/components/Input'
import { PetImage } from './client_components'
import { useFormAction } from '@/hooks/useFormAction'
import { createPet } from '@/controllers/Pet'

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
    <form action={formAction} className='flex items-center gap-4 max-md:flex-col md:items-start'>
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

        <input type='text' defaultValue='1' name='plan' hidden />
        <SubmitButton>Publicar</SubmitButton>
      </section>
    </form>
  )
}
