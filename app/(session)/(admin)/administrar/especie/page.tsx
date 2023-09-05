'use client'

import { Button } from '@/components/Button'
import { Modal, UseModal, useModal } from '@/components/Modal'
import {
  Category,
  TUpserCategory,
  useCategories,
  useDeleteCategory,
  useUpsertCategory,
} from '@/services/category'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { Input } from '@/components/Input'
import { Textarea } from '@nextui-org/react'
import { useState } from 'react'
import { SetState } from '@/types'

const initialCategory: TUpserCategory = { image: '', name: '' }

export default function Page() {
  // STATES
  const [currentCategory, setCurrentCategory] = useState<TUpserCategory>(initialCategory)

  // HOOKS
  const { categories } = useCategories()
  const modal = useModal()

  // FUNCTIONS
  function handleOpenModa() {
    setCurrentCategory(initialCategory)
    modal.open()
  }

  // RENDER
  return (
    <main className='px-4 pt-[var(--header-height)]'>
      <h1>Especies</h1>

      <Button onPress={handleOpenModa}>Crear</Button>
      <UpsertModal
        modal={modal}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
      />

      <section className='flex flex-col gap-y-2'>
        {categories?.map((cat, i) => (
          <Row
            key={cat.id}
            index={i}
            category={cat}
            modal={modal}
            setCurrentCategory={setCurrentCategory}
          />
        ))}
      </section>
    </main>
  )
}

function UpsertModal(props: {
  modal: UseModal
  currentCategory: TUpserCategory
  setCurrentCategory: SetState<TUpserCategory>
}) {
  const { modal, currentCategory, setCurrentCategory } = props

  // HOOKS
  const { handleUpsert } = useUpsertCategory(currentCategory)

  // FUNCTIONS
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    handleUpsert({
      onSuccess: () => {
        modal.close()
      },
    })
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentCategory({ ...currentCategory, [e.target.name]: e.target.value })
  }

  return (
    <Modal modal={props.modal}>
      <form className='flex flex-col gap-y-4' onSubmit={handleSubmit}>
        <Input label='Nombre' name='name' onChange={handleChange} value={currentCategory.name} />
        <Textarea
          onChange={handleChange}
          label='SVG'
          required
          name='image'
          // labelPlacement='outside'
          // placeholder='Enter your description'
          className='w-[400px] max-w-full'
          value={currentCategory.image}
        />
        <Button type='submit'>Guardar</Button>
      </form>
    </Modal>
  )
}

function Row(props: {
  category: Category
  modal: UseModal
  setCurrentCategory: SetState<TUpserCategory>
  index: number
}) {
  const { category, modal, setCurrentCategory, index } = props

  // HOOKS
  const confirmDeleteModal = useModal()
  const { handleDelete } = useDeleteCategory(category.id)

  // FUNCTIONS
  function handleEdit() {
    setCurrentCategory(category)
    modal.open()
  }

  function handleConfirm() {
    handleDelete()
    confirmDeleteModal.close()
  }

  // RENDER
  return (
    <>
      <div key={category.id} className='flex gap-x-4'>
        <span>{index + 1}</span>
        <div
          className='[&>*]:h-5 [&>*]:w-5 [&>*]:text-gray-400'
          dangerouslySetInnerHTML={{ __html: category.image }}
        />
        <span>{category.name}</span>
        <div className='flex gap-x-2'>
          <button onClick={handleEdit}>
            <AiFillEdit />
          </button>
          <button onClick={confirmDeleteModal.open}>
            <AiFillDelete />
          </button>
        </div>
      </div>

      <Modal modal={confirmDeleteModal}>
        <div className='flex flex-col items-center gap-y-4'>
          <p>¿Eliminar {category.name} ?</p>
          <footer className='flex gap-x-2'>
            <Button onClick={confirmDeleteModal.close}>Cancelar</Button>
            <Button onClick={handleConfirm} className='bg-danger-500 text-white'>
              Confirmar
            </Button>
          </footer>
        </div>
      </Modal>
    </>
  )
}
