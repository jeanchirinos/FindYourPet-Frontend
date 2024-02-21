'use client'

import { Textarea } from '@nextui-org/input'
import { SubmitButton } from '@/components/SubmitButton'
import { useFormAction } from '@/hooks/useFormAction'
import { createPet } from '@/controllers/Pet'
import confetti from 'canvas-confetti'
import { IconCheckFilled, IconUser } from '@/icons'
import Link from 'next/link'
import { Button } from '@/components/Button'
import { PetImage } from './PetImage'
import { SessionLogged } from '@/models/Auth'

type Props = {
  StatusInfoComponent: React.ReactNode
  CategoryComponent: React.ReactNode
  PlaceComponent: React.ReactNode
  session: SessionLogged | null
}

export function Form(props: Props) {
  const { session } = props

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
        <p className='max-w-[40ch] text-center text-foreground-600'>
          Tu publicación será revisada y cuando sea aprobada será visible de forma pública
        </p>
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
      <h2 className='mb-8 text-center text-lg font-semibold'>Registro de datos</h2>

      {!session && (
        <div className='sticky top-header z-20 bg-background py-4'>
          <Button
            onClick={() => {
              document.getElementById('#not-logged-menu-trigger')?.click()
            }}
            variant='flat'
            color='warning'
            startContent={<IconUser />}
            fullWidth
          >
            Inicia sesión para poder publicar
          </Button>
        </div>
      )}

      <form action={formAction} className='flex items-center gap-4 max-md:flex-col md:items-start'>
        <PetImage />
        <section className='flex w-[400px] max-w-full shrink-0 flex-col gap-y-3'>
          {props.StatusInfoComponent}
          <Textarea name='description' label='Descripción' isRequired />
          {props.CategoryComponent}
          {props.PlaceComponent}

          <input type='text' defaultValue='' name='location' hidden />
          <input type='text' defaultValue='1' name='plan' hidden />
          <SubmitButton isDisabled={!session}>Publicar</SubmitButton>
        </section>
      </form>
    </>
  )
}
