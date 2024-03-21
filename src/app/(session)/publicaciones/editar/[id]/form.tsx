'use client'

import { Textarea } from '@nextui-org/input'
import { SubmitButton } from '@/components/SubmitButton'
import { useFormAction } from '@/hooks/useFormAction'
import { updatePet } from '@/controllers/PetController/updatePet'
import { PetImage } from '@/app/(session)/publicar/PetImage'
import { useRouter } from 'next/navigation'
import { Pet } from '@/models/Pet'
import { IconBack, IconInfo } from '@/icons'
import { Button } from '@nextui-org/button'
import React, { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/Input'

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
    // TODO
    back()
  }

  const [initialFormData, setInitialFormData] = useState('')
  const [formChanged, setFormChanged] = useState(false)

  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (!formRef.current) return
    const formData = new FormData(formRef.current)
    const formProps = Object.values(Object.fromEntries(formData))

    const stringData = formProps
      .map(value => {
        if (value instanceof File && 'size' in value) {
          return value.name + value.size
        } else {
          return value
        }
      })
      .join('')

    setInitialFormData(stringData)
  }, [])

  // RENDER
  return (
    <>
      <div className='mb-8 flex items-center gap-x-4'>
        <Button isIconOnly onClick={back} size='sm' variant='faded' radius='full'>
          <IconBack />
        </Button>

        <h2 className='text-center text-lg font-semibold'>Edición de datos</h2>
      </div>

      {/* @ts-ignore */}
      {/* Shouldn't appear if is admin */}
      {pet.published === '1' && (
        <blockquote className='mb-4 flex gap-x-2 rounded-xl border border-default-100 bg-default-200/20 px-4 py-3 text-small'>
          <IconInfo className='text-large' />
          Al editar los datos de tu publicación, esta pasará por un proceso de revisión.
        </blockquote>
      )}
      <form
        ref={formRef}
        action={formAction}
        onChange={e => {
          const formData = new FormData(e.currentTarget)
          const formProps = Object.values(Object.fromEntries(formData))

          const stringData = formProps
            .map(value => {
              if (value instanceof File && 'size' in value) {
                return value.name + value.size
              } else {
                return value
              }
            })
            .join('')

          if (initialFormData !== stringData) {
            setFormChanged(true)
          } else {
            setFormChanged(false)
          }
        }}
        className='flex items-center gap-4 max-md:flex-col md:items-start'
      >
        <PetImage initialImage={pet.image.image} />
        <section className='flex w-[400px] max-w-full shrink-0 flex-col gap-y-3'>
          {props.StatusInfoComponent}
          <Textarea
            name='description'
            // @ts-ignore
            defaultValue={pet.description}
            label='Descripción (Opcional)'
            labelPlacement='outside'
          />
          {props.CategoryComponent}
          {props.PlaceComponent}
          <Input
            isRequired={false}
            name='location'
            label='Dirección (Opcional)'
            // @ts-ignore
            defaultValue={pet.location}
          />

          <input defaultValue={pet.id} name='id' hidden />
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
