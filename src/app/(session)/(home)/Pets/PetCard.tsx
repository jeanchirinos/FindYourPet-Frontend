import { twJoin } from 'tailwind-merge'
import Image from 'next/image'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { Pet } from '@/models/Pet'

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
        <footer className='flex gap-1.5 text-sm'>
          <HiOutlineLocationMarker />
          <p>{pet.district_name}</p>
        </footer>
      </div>
    </div>
  )
}
