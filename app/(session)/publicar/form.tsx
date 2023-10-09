'use client'

import { createPet } from '@/serverActions/pet'
import { Textarea } from '@nextui-org/react'
import { SubmitButton } from '@/components/SubmitButton'
import { manageReponse } from '@/utilities/testing'
import { Input } from '@/components/Input'
import { Place } from './client_components'

type Props = {
  StatusComponent: React.ReactNode
  CategoryComponent: React.ReactNode
}

export function Form(props: Props) {
  const { StatusComponent, CategoryComponent } = props

  async function formAction(formData: FormData) {
    const response = await createPet(formData)

    manageReponse(response)
  }

  // RENDER
  return (
    <div className='flex gap-4 max-md:flex-col'>
      <form action={formAction} className='flex flex-col gap-y-3'>
        <input type='file' name='image' required />
        {StatusComponent}
        <Textarea
          name='description'
          label='Descripción'
          isRequired
          className='w-[400px] max-w-full'
        />
        <Input label='Ubicación' isRequired={false} name='location' />
        {CategoryComponent}
        <Place />

        <SubmitButton>Publicar</SubmitButton>
      </form>
    </div>
  )
}
