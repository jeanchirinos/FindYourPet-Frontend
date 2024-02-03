import { twMerge } from 'tailwind-merge'
import { TGetPetParams, getPets } from '@/controllers/Pet'
import Link from 'next/link'
import { IconBack, IconForward, IconPet } from '@/icons'
import { PetCard } from './PetCard'

type Props = { searchParams: TGetPetParams }

export async function PetGrid(props: Props) {
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
