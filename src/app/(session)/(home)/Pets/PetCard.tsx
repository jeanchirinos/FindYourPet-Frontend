import { twJoin } from 'tailwind-merge'
import Image from 'next/image'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { Pet } from '@/models/Pet'
import Link from 'next/link'

type Props = { pet: Pet }

export function PetCard(props: Props) {
  const { pet } = props

  const colors = {
    SE_BUSCA: 'bg-search',
    PERDIDO: 'bg-lost',
    EN_ADOPCIÓN: 'bg-adopt',
  }

  const color = Object.values(colors)[pet.status - 1]

  return (
    <Link
      href={`/mascota/${pet.id}`}
      className='bg-custom1 flex flex-col overflow-hidden rounded-xl shadow-small transition-transform hover:scale-[1.005]'
    >
      <Image
        className='aspect-square w-full object-cover'
        src={pet.image}
        width={pet.image_width}
        height={pet.image_height}
        alt='Mascota'
      />
      <div className='space-y-2.5 p-2'>
        <section className={twJoin('rounded-lg p-1 text-center font-semibold text-white', color)}>
          {pet.status_name}
        </section>
        <footer className='flex flex-col gap-y-1.5 text-sm'>
          <div className='flex gap-x-1.5'>
            <HiOutlineLocationMarker />
            <p>{pet.district_name}</p>
          </div>
          <div className='flex items-center gap-x-1.5'>
            <div
              className='*:size-4'
              dangerouslySetInnerHTML={{ __html: pet.breed.category.image }}
            />
            <span>{pet.breed.name}</span>
          </div>
        </footer>
      </div>
    </Link>
  )
}
