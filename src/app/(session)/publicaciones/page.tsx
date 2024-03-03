import { LinkSearchParams } from '@/components/LinkSearchParams'
import { Suspense } from '@/components/other/CustomSuspense'
import { TGetPetParams } from '@/controllers/Post'
import { Spinner } from '@nextui-org/spinner'
import { PostsList } from './Posts/PostList'
import { Order } from '../(home)/Order'
import { Metadata } from 'next'

type Props = { searchParams: TGetPetParams }

export const metadata: Metadata = {
  title: 'Mis publicaciones',
}

export default function Page(props: Props) {
  const { searchParams } = props

  const { published = '0', page = '1', order = 'desc', ...restSearchParams } = searchParams

  const tabs = [
    {
      id: '0',
      title: 'En revisión',
    },
    {
      id: '1',
      title: 'Aprobados',
    },
  ]

  return (
    <main className='mx-auto flex w-[1600px] max-w-full flex-col gap-y-8 px-2'>
      <header className='flex justify-between'>
        <nav className='flex gap-x-2'>
          {tabs.map(item => (
            <LinkSearchParams
              key={item.id}
              currentParam={published}
              searchParamKey='published'
              searchParamValue={item.id}
              keysToDelete={['page']}
              className='h-fit rounded-md py-1.5'
              classNames={{
                notSelected: 'bg-transparent',
              }}
            >
              {item.title}
            </LinkSearchParams>
          ))}
        </nav>
        <Order order={order} />
      </header>

      <Suspense
        fallback={
          <div className='h-96 flex-center'>
            <Spinner size='lg' />
          </div>
        }
        keyProp={JSON.stringify(searchParams)}
      >
        <PostsList searchParams={{ ...restSearchParams, published, order, page }} />
      </Suspense>
    </main>
  )
}
