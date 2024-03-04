'use client'

import { IconOptions } from '@/icons'
import { DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/dropdown'
import { Modal, UseModal, useModal } from '@/components/Modal'
import { useFormAction } from '@/hooks/useFormAction'
import { deletePost } from '@/controllers/Post'
import { SubmitButton } from '@/components/SubmitButton'
import Link from 'next/link'
import { Pet } from '@/models/Pet'
import { Image } from '@/components/Image'
import { Dropdown } from '@/components/Dropdown'
import { Button } from '@nextui-org/button'

export function PetOptions(props: { pet: Pet }) {
  const deleteModal = useModal()

  return (
    <>
      <Dropdown
        shouldBlockScroll={false}
        classNames={{
          content: 'min-w-fit',
        }}
        style={{
          zIndex: 40,
        }}
      >
        <DropdownTrigger>
          <Button size='sm' variant='light' isIconOnly aria-label='Opciones'>
            <IconOptions />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label='Opciones'
          classNames={{
            list: '*:pr-8',
          }}
          className='a'
        >
          <DropdownItem as={Link} key='edit' href={`/publicaciones/editar/${props.pet.id}`}>
            Editar
          </DropdownItem>
          {/* <DropdownItem
            key='finish'
            // onClick={deleteModal.open}
          >
            Finalizar anuncio
          </DropdownItem> */}
          <DropdownItem
            key='delete'
            className='text-danger'
            color='danger'
            onClick={deleteModal.open}
          >
            Eliminar
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <DialogDelete modal={deleteModal} pet={props.pet} />
    </>
  )
}

function DialogDelete(props: { pet: Pet; modal: UseModal }) {
  const { modal, pet } = props

  const { formAction } = useFormAction(deletePost, {
    onSuccess: modal.close,
  })

  return (
    <Modal modal={modal}>
      <form action={formAction} className='space-y-4'>
        <input name='id' hidden defaultValue={pet.id} />

        <span>¿ Estás seguro de eliminar tu publicación? </span>

        <article className='flex justify-center'>
          {/* <Image */}
          <img
            src={pet.image}
            width={500}
            height={500}
            alt='Imagen de mascota a eliminar'
            className='size-28 rounded-md object-cover object-center'
          />
        </article>

        <footer className='flex justify-center gap-x-2'>
          <Button onClick={modal.close}>No, cancelar</Button>
          <SubmitButton color='danger'>Sí, eliminar</SubmitButton>
        </footer>
      </form>
    </Modal>
  )
}
