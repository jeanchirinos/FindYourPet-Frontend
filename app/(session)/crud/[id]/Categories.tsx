'use client'

import {
  BaseRow,
  BaseRowProps,
  BaseUpsertModal,
  BaseUpsertModalProps,
  Crud,
  RowProps,
  UpsertModalProps,
} from '@/components/Crud'
import { Input } from '@/components/Input'
import { SWRKey } from '@/enums'
import { useList } from '@/hooks/useCrud'
import { Category } from '@/services/category'

import { Textarea } from '@nextui-org/react'

const initialData = {
  name: '',
}

const swrKey = SWRKey.CATEGORIES
const listUrl = 'category'
const upsertUrl = 'category-upsert'
const deleteUrl = 'category-delete'
const title = 'Especies'

type List = Category[]

export function Categories() {
  const useData = useList<List>({ swrKey, listUrl })
  const { data } = useData

  return (
    <Crud
      title={title}
      initialData={initialData}
      data={data}
      useData={useData}
      Row={Row}
      UpsertModal={UpsertModal}
      swrKey={swrKey}
    />
  )
}

function Row(props: RowProps) {
  const baseProps: BaseRowProps = {
    ...props,
    swrKey,
    deleteUrl,
  }

  const { category } = props

  // RENDER
  return (
    <BaseRow {...baseProps}>
      <div
        className='[&>*]:h-5 [&>*]:w-5 [&>*]:text-gray-400'
        dangerouslySetInnerHTML={{ __html: category.image }}
      />
      <span>{category.name}</span>
    </BaseRow>
  )
}

function UpsertModal(props: UpsertModalProps) {
  const baseProps: BaseUpsertModalProps = {
    ...props,
    swrKey,
    upsertUrl,
  }

  const { currentCategory, setCurrentCategory } = props

  // FUNCTIONS
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentCategory({ ...currentCategory, [e.target.name]: e.target.value })
  }

  // RENDER
  return (
    <BaseUpsertModal {...baseProps}>
      <Input label='Nombre' name='name' onChange={handleChange} value={currentCategory?.name} />
      <Textarea
        onChange={handleChange}
        label='SVG'
        required
        name='image'
        className='w-[400px] max-w-full'
        value={currentCategory?.image}
      />
    </BaseUpsertModal>
  )
}
