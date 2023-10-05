import { requestAction } from '@/utilities/actionsRequest'
import { Form, PetInfo } from './form'
import { Category } from '@/services/category'
import { Suspense } from 'react'

async function getCategories() {
  const response = await requestAction<{ data: Category[] }>('category')

  if (response.status === 'error') throw new Error('')

  return response.data
}

export default async function Page() {
  return (
    <main className='animate-fade px-2 py-4 animate-duration-200'>
      <section className='mx-auto w-[768px] max-w-full px-4 py-4'>
        <h2 className='mb-10 text-center'>Registro de datos</h2>
        <Form>
          <Suspense>
            <CategoryList />
          </Suspense>
        </Form>
      </section>
    </main>
  )
}

async function CategoryList() {
  const categories = await getCategories()

  return <PetInfo categories={categories} />
}
