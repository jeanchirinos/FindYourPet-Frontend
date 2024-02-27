'use client'

import { Textarea } from '@nextui-org/input'
import { SubmitButton } from '@/components/SubmitButton'
import { useFormAction } from '@/hooks/useFormAction'
import { updatePet } from '@/controllers/Pet'
import { PetImage } from '@/app/(session)/publicar/PetImage'
import { redirect, useRouter } from 'next/navigation'
import { Pet } from '@/models/Pet'
import { IconBack } from '@/icons'
import { Button } from '@/components/Button'
import { useEffect, useRef, useState } from 'react'

type Props = {
  StatusInfoComponent: React.ReactNode
  CategoryComponent: React.ReactNode
  PlaceComponent: React.ReactNode
  pet: Pet
}

export function Form(props: Props) {
  const { pet } = props

  // HOOKS
  const { formAction } = useFormAction(updatePet, {
    onSuccess,
  })

  const { back } = useRouter()

  // FUNCTIONS
  function onSuccess() {
    redirect('/publicaciones')
  }

  const [initialFormData, setInitialFormData] = useState('')
  const [formChanged, setFormChanged] = useState(false)

  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const formData = new FormData(formRef.current!)
    const formProps = Object.fromEntries(formData)

    const stringData = Object.values(formProps).reduce((acc, value) => {
      if (value instanceof File && 'size' in value) {
        //@ts-ignore
        return acc + value.size
      } else {
        return (acc as string) + value
      }
    })

    setInitialFormData(stringData as string)
  }, [])

  // RENDER
  return (
    <>
      <div className='mb-8 flex items-center gap-x-4'>
        <Button
          onClick={back}
          size='sm'
          variant='faded'
          radius='full'
          className='aspect-square h-fit min-w-fit !p-2 *:shrink-0'
        >
          <IconBack />
        </Button>

        <h2 className='text-center text-lg font-semibold'>Edición de datos</h2>
      </div>
      <form
        ref={formRef}
        action={formAction}
        onChange={e => {
          const formData = new FormData(e.currentTarget)
          const formProps = Object.fromEntries(formData)

          const stringData = Object.values(formProps).reduce((acc, value) => {
            if (value instanceof File && 'size' in value) {
              // @ts-ignore
              return acc + value.size
            } else {
              return (acc as string) + value
            }
          })

          if (initialFormData !== stringData) {
            setFormChanged(true)
          } else {
            setFormChanged(false)
          }
        }}
        className='flex items-center gap-4 max-md:flex-col md:items-start'
      >
        <PetImage initialImage={pet.image} />
        <section className='flex max-w-full shrink-0 flex-col gap-y-3 md:w-[400px]'>
          {props.StatusInfoComponent}
          <Textarea
            name='description'
            defaultValue={pet.description}
            label='Descripción'
            isRequired
          />
          {props.CategoryComponent}
          {props.PlaceComponent}

          <input defaultValue={pet.id} name='id' hidden />
          <input defaultValue='' name='location' hidden />
          <input defaultValue='1' name='plan' hidden />
          <SubmitButton
            isDisabled={!formChanged}
            title={!formChanged ? 'Los datos están incompletos o no han sido modificados' : ''}
          >
            Actualizar
          </SubmitButton>
        </section>
      </form>
    </>
  )
}
