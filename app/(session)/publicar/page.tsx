import { Form } from './form'
import { Categories, Place, Status } from './server_components'

export default function Page() {
  return (
    <main className='mx-auto w-[768px] max-w-full animate-fade px-2 py-4 animate-duration-200'>
      <h2 className='mb-10 text-center text-lg font-semibold'>Registro de datos</h2>
      <Form
        StatusComponent={<Status />}
        PlaceComponent={<Place />}
        CategoryComponent={<Categories />}
      />
    </main>
  )
}
