import { twJoin, twMerge } from 'tailwind-merge'
import Image from 'next/image'
import { Suspense } from '@/components/other/CustomSuspense'
import { TGetPetParams, getPets, getStatusList } from '@/controllers/Pet'
import Link from 'next/link'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { Pet } from '@/models/Pet'
import { StatusInfo } from './client_components'
import { IconBack, IconForward, IconPet } from '@/icons'
import { PetGridSkeleton } from '@/Skeletons/PetGridSkeleton'

type Props = { searchParams: TGetPetParams }

// MAIN COMPONENT
export default function Page(props: Props) {
  const { searchParams } = props

  return (
    <main className='mx-auto flex w-[1600px] max-w-full animate-fade gap-x-6 px-2 pb-2 animate-duration-200'>
      <Suspense>
        <FiltersComponentServer />
      </Suspense>
      <div className='flex w-full flex-col'>
        <Suspense fallback={<PetGridSkeleton />} keyProp={searchParams.status}>
          <PetGrid searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  )
}

// COMPONENTS

async function PetGrid(props: { searchParams: TGetPetParams }) {
  const { status = '1', ...restSearchParams } = props.searchParams

  const petsData = await getPets({ ...restSearchParams, status })

  const { data: pets, links } = petsData

  if (pets.length === 0)
    return (
      <div className='h-44 flex-col gap-y-4 flex-center'>
        <IconPet className='animate-wiggle text-5xl' />
        <p className='text-center text-xl'>No se encontraron mascotas</p>
      </div>
    )

  return (
    <>
      <div className='templateColumns-[300px] grid grow gap-4'>
        {pets.map(pet => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>

      <div className='flex justify-center gap-x-2 py-5'>
        <IconBack />

        {links.slice(0, -1).map(link => {
          if (link.url === null) return null

          const url = '?page=' + link.label

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

        <IconForward />
      </div>
    </>
  )
}

function PetCard(props: { pet: Pet }) {
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
        className='size-full object-cover'
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
