import { twJoin, twMerge } from 'tailwind-merge'
import Image from 'next/image'
import { Suspense } from 'react'
import { TGetPetParams, getPets, getStatusList } from '@/controllers/Pet'
import Link from 'next/link'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { PetPaginate } from '@/models/Pet'
import { StatusInfo } from './client_components'

type SearchProps = Partial<TGetPetParams>

// export const dynamic = 'force-dynamic'

// MAIN COMPONENT
export default function Page(props: { searchParams: SearchProps }) {
  return (
    <main className='animate-fade px-2 pb-2 pt-12 animate-duration-200'>
      <div className='mx-auto flex w-[1600px] max-w-full gap-x-6'>
        <FiltersComponentServer />
        <div className='flex w-full flex-col'>
          <Suspense fallback={<PetGridSkeleton />}>
            <PetGrid searchParams={props.searchParams} />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

// COMPONENTS
async function PetGrid(props: { searchParams: SearchProps }) {
  const petsData = await getPets(props.searchParams)

  const { data: pets, links } = petsData

  return (
    <>
      <div className='templateColumns-[300px] grid gap-4'>
        {pets.map(pet => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>

      <div className='flex justify-center gap-x-2 py-5'>
        {links.map(link => {
          if (link.url === null) return null

          const url = '?' + link.url.split('?')[1]

          return (
            <Link
              href={url}
              key={link.label}
              className={twMerge(
                'rounded-lg bg-th-fg-2 p-2',
                link.active && 'bg-primary text-white',
              )}
            >
              {link.label}
            </Link>
          )
        })}
      </div>
    </>
  )
}

function PetCard(props: { pet: PetPaginate['data'][0] }) {
  const { pet } = props

  const colors = {
    SE_BUSCA: 'bg-search',
    PERDIDO: 'bg-lost',
    EN_ADOPCIÓN: 'bg-adopt',
  }

  const color = Object.values(colors)[pet.status - 1]

  return (
    <div className='flex flex-col gap-2 overflow-hidden rounded-xl bg-th-fg-2 pb-4'>
      <Image
        className='aspect-square w-full object-cover'
        src={pet.image}
        width={pet.image_width}
        height={pet.image_height}
        alt='Mascota'
      />
      <div className='space-y-3 px-4'>
        <section
          className={twJoin('rounded-3xl p-2 text-center text-lg font-semibold text-white', color)}
        >
          {pet.status_name}
        </section>
        <footer className='flex items-center gap-1.5'>
          <HiOutlineLocationMarker />
          <p>
            {pet.city}, {pet.district}
          </p>
        </footer>
      </div>
    </div>
  )
}

// SKELETONS
function PetGridSkeleton() {
  return (
    <>
      <section className='templateColumns-[300px] grid gap-4'>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className='aspect-square animate-pulse rounded-xl bg-th-fg-2' />
        ))}
      </section>
    </>
  )
}

async function FiltersComponentServer() {
  const statusList = await getStatusList()

  return (
    <aside className='max-lg:hidden'>
      <section className='space-y-2'>
        <p>Estado</p>

        <StatusInfo statusList={statusList} />
      </section>
    </aside>
  )
}
