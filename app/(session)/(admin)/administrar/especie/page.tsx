'use client'

import { Button } from '@/components/Button'
import { Modal, UseModal, useModal } from '@/components/Modal'
import { Category, useCategories, useDeleteCategory, useUpsertCategory } from '@/services/category'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { Input } from '@/components/Input'
import { Textarea } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { SetState } from '@/types'

const initialCategory: Omit<Category, 'id'> = { image: '', name: '' }

export default function Page() {
  const { categories } = useCategories()
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null)

  const modal = useModal()

  function handleOpenModa() {
    //@ts-ignore
    setCurrentCategory(initialCategory)
    modal.open()
  }

  return (
    <main className='px-4 pt-[var(--header-height)]'>
      <h1>Especies</h1>

      <Button onPress={handleOpenModa}>Crear</Button>
      <UpsertModal modal={modal} currentCategory={currentCategory} />

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

function UpsertModal(props: { modal: UseModal; currentCategory: Category | null }) {
  const { modal, currentCategory } = props

  //@ts-ignore
  const [category, setCategory] = useState<Category>(currentCategory ?? initialCategory)

  const { handleUpsert } = useUpsertCategory(category)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    handleUpsert({
      onSuccess: () => {
        modal.close()
      },
    })
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCategory({ ...category, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    //@ts-ignore
    setCategory(currentCategory ?? initialCategory)
  }, [currentCategory])

  return (
    <Modal modal={props.modal}>
      <form className='flex flex-col gap-y-4' onSubmit={handleSubmit}>
        <Input label='Nombre' name='name' onChange={handleChange} value={category.name} />
        <Textarea
          onChange={handleChange}
          label='SVG'
          required
          name='image'
          // labelPlacement='outside'
          // placeholder='Enter your description'
          className='w-[400px] max-w-full'
          value={category.image}
        />
        <Button type='submit'>Guardar</Button>
      </form>
    </Modal>
  )
}

function Row(props: {
  category: Category
  modal: UseModal
  setCurrentCategory: SetState<Category | null>
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
