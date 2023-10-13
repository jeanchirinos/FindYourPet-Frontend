'use client'

import { MyCombobox } from '@/components/Combobox'
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
import { BreedsData } from '@/services/breed'
import { useCategories } from '@/services/category'
import { useEffect, useState } from 'react'
import { mutate } from 'swr'

const upsertUrl = 'breed-upsert'
const deleteUrl = 'breed-delete'
const title = 'Razas'

type List = BreedsData

export function Breeds() {
  const { categories = [] } = useCategories()

  const [selected, setSelected] = useState(categories[0])

  const listUrl = `breedList/${selected?.id}`

  const swrKey = (SWRKey.BREEDS + selected?.id) as SWRKey

  const useData = useList<List>({ swrKey, listUrl })

  const { data: breedsData } = useData
  const data = breedsData?.breeds

  const initialData = {
    name: '',
    category_id: selected?.id,
  }

  const [currentCategory, setCurrentCategory] = useState(initialData)

  useEffect(() => {
    setSelected(categories[0])
  }, [categories])

  useEffect(() => {
    if (!selected?.id) return
    mutate(swrKey)

    setCurrentCategory(prev => ({ ...prev, category_id: selected.id }))
    //! swrKey ?
  }, [selected])

  return (
    <>
      <div className='pt-20'>
        <MyCombobox categories={categories} selected={selected} setSelected={setSelected} />
      </div>

      <Crud
        title={title}
        initialData={initialData}
        data={data}
        useData={useData}
        Row={Row}
        UpsertModal={UpsertModal}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
        swrKey={swrKey}
      />
    </>
  )
}

function Row(props: RowProps) {
  const baseProps: BaseRowProps = {
    ...props,
    deleteUrl,
  }

  const { category } = props

  // RENDER
  return (
    <BaseRow {...baseProps}>
      <span>{category.name}</span>
    </BaseRow>
  )
}

function UpsertModal(props: UpsertModalProps) {
  const baseProps: BaseUpsertModalProps = {
    ...props,
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
    </BaseUpsertModal>
  )
}
