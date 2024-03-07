import { Categories } from '@/app/(session)/publicar/Categories/Categories'
import { StatusInfo } from '@/app/(session)/publicar/StatusInfo'
import { Place } from '@/app/(session)/publicar/Place/Place'
import { Metadata } from 'next'
import { PageProps } from '@/types'
import { Form } from './form'
import { getPetByIdEdit } from '@/controllers/Pet'

export const metadata: Metadata = {
  title: 'Editar publicación',
}

type Props = PageProps<'id'>

export default async function Page(props: Props) {
  const pet = await getPetByIdEdit(props.params.id)

  return (
    <main className='mx-auto flex w-[768px] max-w-full grow flex-col px-2'>
      <Form
        StatusInfoComponent={<StatusInfo status={pet.status} />}
        CategoryComponent={
          <Categories initialCategoryId={pet.breed.category_id} initialBreedId={pet.breed.id} />
        }
        PlaceComponent={
          <Place
            initialData={{
              //@ts-ignore
              estate: pet.estate,
              city: pet.city,
              district: pet.district,
            }}
          />
        }
        pet={pet}
      />
    </main>
  )
}
