import { twJoin, twMerge } from 'tailwind-merge'
import Image from 'next/image'
import { TGetPetParams, getPets } from '@/controllers/Pet'
import Link from 'next/link'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { Pet } from '@/models/Pet'
import { IconBack, IconForward, IconPet } from '@/icons'

export async function PetGrid(props: { searchParams: TGetPetParams }) {
  const petsData = await getPets(props.searchParams)

  const { data: pets, links } = petsData

  if (pets.length === 0)
    return (
      <div className='h-96 flex-col gap-y-4 flex-center'>
        <IconPet className='animate-wiggle text-5xl' />
        <p className='text-center text-xl'>No se encontraron mascotas</p>
      </div>
    )

  return (
    <div className='flex w-full grow flex-col gap-y-3.5'>
      <div className='templateColumns-[200px] grid grow auto-rows-min gap-4 lg:templateColumns-[250px]'>
        {pets.map(pet => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>

      <div className='flex items-center justify-center gap-x-2'>
        <IconBack />

        {links.slice(0, -1).map(link => {
          if (link.url === null) return null

          const url = '?page=' + link.label

          return (
            <Link
              href={url}
              key={link.label}
              className={twMerge(
                'rounded-lg bg-th-fg-2 px-3 py-0.5',
                link.active && 'bg-primary text-white',
              )}
            >
              {link.label}
            </Link>
          )
        })}

        <IconForward />
      </div>
    </div>
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
    <div className='flex flex-col overflow-hidden rounded-xl bg-th-fg-2'>
      <Image
        className='aspect-square w-full object-cover'
        src={pet.image}
        width={pet.image_width}
        height={pet.image_height}
        alt='Mascota'
      />
      <div className='space-y-2.5 px-2 pb-2 pt-3'>
        <section
          className={twJoin('rounded-lg p-1.5 text-center text-lg font-semibold text-white', color)}
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
