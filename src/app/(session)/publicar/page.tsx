import { Form } from './form'
import { Categories, Place, Status } from './server_components'

export default function Page() {
  return (
    <main className='animate-fadea mx-auto w-[768px] max-w-full px-2 animate-duration-200'>
      <Form
        StatusComponent={<Status />}
        PlaceComponent={<Place />}
        CategoryComponent={<Categories />}
      />
    </main>
  )
}
