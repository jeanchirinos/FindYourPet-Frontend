'use client'
import { Button } from '@/components/Button'
import { Modal, UseModal, useModal } from '@/components/Modal'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { Spinner } from '@nextui-org/react'
import { useState } from 'react'
import { SetState } from '@/types'
import { useDelete, useUpsert } from '@/hooks/useCrud'
import { SWRKey } from '@/enums'

type CrudProps = {
  useData: any
  title: string
  UpsertModal: any
  initialData: any
  Row: any
  data: any
  currentCategory?: any
  setCurrentCategory?: any
  swrKey?: any
}

export function Crud(props: CrudProps) {
  const { useData, data, initialData, swrKey } = props
  const { isLoading, isValidating } = useData

  // HOOKS
  const [currentCategory, setCurrentCategory] = useState(props.initialData)
  const upsertModal = useModal()

  const currentEntity = props.currentCategory ?? currentCategory
  const setCurrentEntity = props.setCurrentCategory ?? setCurrentCategory

  // FUNCTIONS
  function handleOpenModal() {
    setCurrentEntity(initialData)
    upsertModal.open()
  }

  // RENDER
  return (
    <>
      <main className='inline-flex flex-col gap-y-6 px-4 pt-[calc(var(--header-height)+2rem)]'>
        <div className='flex gap-x-2'>
          <h1 className='text-3xl font-black'>{props.title}</h1>
          {isLoading || (isValidating && <Spinner size='sm' />)}
        </div>

        <Button onPress={handleOpenModal}>Crear</Button>

        <section className='flex flex-col gap-y-2'>
          {data?.map((cat: any, i: any) => (
            <props.Row
              swrKey={swrKey}
              key={cat.id}
              category={cat}
              index={i}
              upsertModal={upsertModal}
              setCurrentCategory={setCurrentEntity}
            />
          ))}
        </section>
      </main>

      {/* Modal */}
      <props.UpsertModal
        swrKey={swrKey}
        modal={upsertModal}
        currentCategory={currentEntity}
        setCurrentCategory={setCurrentEntity}
      />
    </>
  )
}

export type BaseRowProps = React.PropsWithChildren &
  RowProps & {
    swrKey: SWRKey
    deleteUrl: string
  }

export type RowProps = {
  swrKey: any
  category: any // category: { id: number }
  upsertModal: UseModal
  setCurrentCategory: SetState<{ id: number }>
  index: number
}

// COMPONENTS
export function BaseRow(props: BaseRowProps) {
  const { category, upsertModal, setCurrentCategory, index, swrKey, deleteUrl } = props

  // HOOKS
  const confirmDeleteModal = useModal()
  const { handleDelete } = useDelete({ id: category.id, key: swrKey, url: deleteUrl })

  // FUNCTIONS
  function handleEdit() {
    setCurrentCategory(category)
    upsertModal.open()
  }

  function handleConfirmDelete() {
    handleDelete()
    confirmDeleteModal.close()
  }

  // RENDER
  return (
    <>
      <div className='flex gap-x-4'>
        <span>{index + 1}</span>
        {props.children}
        <div className='flex gap-x-2'>
          <button onClick={handleEdit}>
            <AiFillEdit />
          </button>
          <button onClick={confirmDeleteModal.open}>
            <AiFillDelete />
          </button>
        </div>
      </div>
      {/* Modal */}
      <Modal modal={confirmDeleteModal}>
        <div className='flex flex-col items-center gap-y-4'>
          {/* <p>¿Eliminar {category.name} ?</p> */}
          <p>¿Eliminar ?</p>
          <footer className='flex gap-x-2'>
            <Button onClick={confirmDeleteModal.close}>Cancelar</Button>
            <Button onClick={handleConfirmDelete} className='bg-danger-500 text-white'>
              Confirmar
            </Button>
          </footer>
        </div>
      </Modal>
    </>
  )
}

export type BaseUpsertModalProps = React.PropsWithChildren &
  UpsertModalProps & {
    upsertUrl: string
  }

export type UpsertModalProps = {
  swrKey: any
  modal: UseModal
  currentCategory: any
  setCurrentCategory: any
}

export function BaseUpsertModal(props: BaseUpsertModalProps) {
  const { children, modal, swrKey, upsertUrl, currentCategory } = props

  // HOOKS
  const { handleUpsert } = useUpsert({
    key: swrKey,
    url: upsertUrl,
    arg: currentCategory,
  })

  // FUNCTIONS
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    handleUpsert({
      onSuccess: () => {
        modal.close()
      },
    })
  }

  // RENDER
  return (
    <Modal modal={modal}>
      <form className='flex flex-col gap-y-4' onSubmit={handleSubmit}>
        {children}
        <Button type='submit'>Guardar</Button>
      </form>
    </Modal>
  )
}
