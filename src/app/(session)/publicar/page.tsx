import { Categories } from './Categories/Categories'
import { StatusInfo } from './StatusInfo'
import { Form } from './form'
import { Place } from './Place/Place'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Publicar',
}

export default function Page() {
  return (
    <main className='mx-auto flex w-[768px] max-w-full grow flex-col px-2'>
      <Form
        StatusInfoComponent={<StatusInfo />}
        CategoryComponent={<Categories />}
        PlaceComponent={<Place />}
      />
    </main>
  )
}
