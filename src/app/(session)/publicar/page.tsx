import { Categories } from './Categories/Categories'
import { StatusInfo } from './StatusInfo'
import { Form } from './form'
import { Place } from './Place/Place'
import { Metadata } from 'next'
import { PageProps } from '@/types'
import { getSession } from '@/controllers/Auth'

export const metadata: Metadata = {
  title: 'Publicar',
}

type Props = PageProps<{}, 'status'>

export default async function Page(props: Props) {
  const session = await getSession()

  return (
    <main className='mx-auto flex w-[768px] max-w-full grow flex-col px-2'>
      <Form
        StatusInfoComponent={<StatusInfo status={props.searchParams.status} />}
        CategoryComponent={<Categories />}
        PlaceComponent={<Place />}
        session={session}
      />
    </main>
  )
}
