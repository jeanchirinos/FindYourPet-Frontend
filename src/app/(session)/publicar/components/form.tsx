'use client'

import { Textarea } from '@nextui-org/input'
import { SubmitButton } from '@/components/SubmitButton'
import { useFormAction } from '@/hooks/useFormAction'
import { createPet } from '@/controllers/PetController/createPet'
import confetti from 'canvas-confetti'
import { IconCheckFilled, IconUser } from '@/icons'
import { Button } from '@nextui-org/button'
import { PetImage } from './PetImage'
import { SessionLogged } from '@/controllers/UserController/getSession'
import { Title } from '@/components/business/Title'
import { ButtonLink } from '@/components/ButtonLink'
import { ROUTE } from '@/routes'
import { Input } from '@/components/Input'

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
    const dogShape = confetti.shapeFromText({ text: '🐕' })

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
          <ButtonLink href={ROUTE.PETS.INDEX}>Ver mascotas</ButtonLink>
          <Button color='primary' onClick={() => setState({ msg: '', ok: null })}>
            Volver a registrar
          </Button>
        </footer>
      </div>
    )
  }

  return (
    <>
      <Title>Registro de datos</Title>

      {!session && (
        <div className='sticky top-header z-20 bg-background py-4'>
          <Button
            onClick={() => {
              document.getElementById('not-logged-menu-trigger')?.click()
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
          <Textarea name='description' label='Descripción (Opcional)' labelPlacement='outside' />
          {props.CategoryComponent}
          {props.PlaceComponent}
          <Input isRequired={false} name='location' label='Dirección (Opcional)' placeholder='Av. Cuba 361' />

          <SubmitButton isDisabled={!session}>Publicar</SubmitButton>
        </section>
      </form>
    </>
  )
}
