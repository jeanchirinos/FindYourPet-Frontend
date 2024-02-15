import { twJoin } from 'tailwind-merge'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { Pet } from '@/models/Pet'
import Link from 'next/link'
import { Image } from '@/components/Image'

type Props = { pet: Pet; index?: number }

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
      className='group flex flex-col overflow-hidden rounded-xl bg-custom1 shadow-small'
    >
      <picture className='relative aspect-square w-full overflow-hidden'>
        <Image
          className='absolute size-full object-cover transition-transform group-hover:scale-110'
          src={pet.image}
          width={pet.image_width || 500}
          height={pet.image_height || 500}
          alt='Mascota'
          priority={props.index === 0}
        />
      </picture>
      <div className='space-y-2.5 p-2'>
        <section
          className={twJoin(
            'flex items-center justify-center gap-x-1.5 rounded-xl p-1 text-white',
            color,
          )}
        >
          <div
            className='*:size-4'
            dangerouslySetInnerHTML={{ __html: pet.breed.category.image }}
          />
          <span>{pet.breed.name}</span>
        </section>
        <footer className='flex flex-col gap-y-1.5 text-sm'>
          <div className='flex gap-x-1.5'>
            <HiOutlineLocationMarker />
            <p>{pet.district_name}</p>
          </div>
        </footer>
      </div>
    </Link>
  )
}
