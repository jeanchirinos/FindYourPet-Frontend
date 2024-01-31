'use client'

import { Textarea } from '@nextui-org/react'
import { SubmitButton } from '@/components/SubmitButton'
import { Input } from '@/components/Input'
import { PetImage } from './client_components'
import { useFormAction } from '@/hooks/useFormAction'
import { createPet } from '@/controllers/Pet'
import confetti from 'canvas-confetti'
import { IconCheckFilled } from '@/icons'
import Link from 'next/link'
import { Button } from '@/components/Button'

type Props = {
  StatusComponent: React.ReactNode
  CategoryComponent: React.ReactNode
  PlaceComponent: React.ReactNode
}

export function Form(props: Props) {
  const { StatusComponent, CategoryComponent, PlaceComponent } = props

  const { formAction, state, setState } = useFormAction(createPet, {
    showSuccessToast: false,
    onSuccess: () => {
      const dogShape = confetti.shapeFromText({ text: '🐈' })

      confetti({
        shapes: [dogShape],
      })
    },
  })

  if (state.ok) {
    return (
      <div className='h-full flex-col gap-y-4 flex-center'>
        <header className='flex flex-col items-center gap-y-4'>
          <IconCheckFilled className='text-5xl' />
          <p>Se ha registrado correctamente</p>
        </header>
        <footer className='flex gap-x-2.5'>
          <Link href='/' className='rounded-xl bg-foreground-200 px-4 py-2 text-sm flex-center'>
            Ver mascotas
          </Link>
          <Button className='bg-primary' onClick={() => setState({ msg: '', ok: null })}>
            Volver a registrar
          </Button>
        </footer>
      </div>
    )
  }

  // RENDER
  return (
    <>
      <h2 className='mb-10 text-center text-lg font-semibold'>Registro de datos</h2>
      <form action={formAction} className='flex items-center gap-4 max-md:flex-col md:items-start'>
        <PetImage />
        <section className='flex w-[400px] max-w-full shrink-0 flex-col gap-y-3'>
          {StatusComponent}
          <Textarea name='description' label='Descripción' isRequired />
          <Input label='Ubicación' isRequired={false} name='location' />
          {CategoryComponent}
          {PlaceComponent}

          <input type='text' defaultValue='1' name='plan' hidden />
          <SubmitButton>Publicar</SubmitButton>
        </section>
      </form>
    </>
  )
}
