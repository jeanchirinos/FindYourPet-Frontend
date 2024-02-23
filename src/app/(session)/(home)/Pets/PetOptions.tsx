'use client'

import { IconOptions } from '@/icons'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/dropdown'
import { Button, ButtonWithRef } from '@/components/Button'
import { Modal, UseModal, useModal } from '@/components/Modal'
import { useFormAction } from '@/hooks/useFormAction'
import { deletePost } from '@/controllers/Post'
import { SubmitButton } from '@/components/SubmitButton'

export function PetOptions() {
  const deleteModal = useModal()

  return (
    <>
      <Dropdown
        shouldBlockScroll={false}
        classNames={{
          content: 'min-w-fit',
        }}
      >
        <DropdownTrigger>
          <ButtonWithRef size='sm' variant='light' className='min-w-fit'>
            <IconOptions size={20} />
          </ButtonWithRef>
        </DropdownTrigger>
        <DropdownMenu
          aria-label='Opciones'
          classNames={{
            list: '*:pr-8',
          }}
        >
          <DropdownItem key='edit'>Editar</DropdownItem>
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

      <DialogDelete modal={deleteModal} deleteId={1} />
    </>
  )
}

function DialogDelete(props: { deleteId: string | number; modal: UseModal }) {
  const { modal, deleteId } = props

  const { formAction } = useFormAction(deletePost, {
    onSuccess: modal.close,
  })

  return (
    <Modal modal={modal}>
      <form action={formAction} className='space-y-4'>
        <input name='id' hidden defaultValue={deleteId} />

        <span>¿ Estás seguro de eliminar tu publicación? </span>

        <footer className='flex justify-center gap-x-2'>
          <Button onClick={modal.close}>No, cancelar</Button>
          <SubmitButton color='danger'>Sí, eliminar</SubmitButton>
        </footer>
      </form>
    </Modal>
  )
}
