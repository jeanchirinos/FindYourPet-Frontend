import { Form } from './form'
import { Categories, Place, Status } from './server_components'

export default function Page() {
  return (
    <main className='mx-auto flex w-[768px] max-w-full grow flex-col px-2'>
      <Form
        StatusComponent={<Status />}
        PlaceComponent={<Place />}
        CategoryComponent={<Categories />}
      />
    </main>
  )
}
