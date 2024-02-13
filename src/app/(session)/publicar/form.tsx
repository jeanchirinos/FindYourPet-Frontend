'use client'

import { Textarea } from '@nextui-org/react'
import { SubmitButton } from '@/components/SubmitButton'
import { Input } from '@/components/Input'
import { useFormAction } from '@/hooks/useFormAction'
import { createPet } from '@/controllers/Pet'
import confetti from 'canvas-confetti'
import { IconCheckFilled } from '@/icons'
import Link from 'next/link'
import { Button } from '@/components/Button'
import { PetImage } from './PetImage'

type Props = {
  StatusInfoComponent: React.ReactNode
  CategoryComponent: React.ReactNode
  PlaceComponent: React.ReactNode
}

export function Form(props: Props) {
  // HOOKS
  const { formAction, state, setState } = useFormAction(createPet, {
    showSuccessToast: false,
    onSuccess,
  })

  // FUNCTIONS
  function onSuccess() {
    const dogShape = confetti.shapeFromText({ text: '🐈' })

    confetti({
      shapes: [dogShape],
    })
  }

  // RENDER

  if (state.ok) {
    return (
      <div className='flex-col gap-y-6 flex-center lg:h-[648px]'>
        <header className='flex flex-col items-center gap-y-3'>
          <IconCheckFilled className='text-5xl' />
          <p>Se ha registrado correctamente</p>
        </header>
        <footer className='flex gap-x-2.5'>
          <Link href='/' className='rounded-xl bg-foreground-200 px-4 py-2 text-sm flex-center'>
            Ver mascotas
          </Link>
          <Button color='primary' onClick={() => setState({ msg: '', ok: null })}>
            Volver a registrar
          </Button>
        </footer>
      </div>
    )
  }

  return (
    <>
      <h2 className='mb-10 text-center text-lg font-semibold'>Registro de datos</h2>
      <form action={formAction} className='flex items-center gap-4 max-md:flex-col md:items-start'>
        <PetImage />
        <section className='flex w-[400px] max-w-full shrink-0 flex-col gap-y-3'>
          {props.StatusInfoComponent}
          <Textarea name='description' label='Descripción' isRequired />
          <Input label='Ubicación' isRequired={false} name='location' />
          {props.CategoryComponent}
          {props.PlaceComponent}

          <input type='text' defaultValue='1' name='plan' hidden />
          <SubmitButton>Publicar</SubmitButton>
        </section>
      </form>
    </>
  )
}
