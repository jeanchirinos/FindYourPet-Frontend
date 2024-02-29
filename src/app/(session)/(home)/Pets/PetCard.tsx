import { twJoin } from 'tailwind-merge'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { Pet } from '@/models/Pet'
import Link from 'next/link'
import { Image } from '@/components/Image'
import { PetOptions } from './PetOptions'

type Props = { pet: Pet; index?: number; isEditable?: boolean }

export function PetCard(props: Props) {
  const { pet, index, isEditable = false } = props

  // VALUES
  const colors = {
    SE_BUSCA: 'bg-search',
    PERDIDO: 'bg-lost',
    EN_ADOPCIÓN: 'bg-adopt',
  }

  const color = Object.values(colors)[pet.status - 1]

  // RENDER
  return (
    <article className='flex flex-col overflow-hidden rounded-xl bg-custom1 shadow-small'>
      <Link
        href={`/mascotas/${pet.id}`}
        className='group relative aspect-square w-full overflow-hidden'
      >
        <Image
          className='absolute size-full object-cover transition-transform group-hover:scale-110'
          src={pet.image}
          width={pet.image_width ?? 500}
          height={pet.image_height ?? 500}
          alt='Mascota'
          priority={index === 0}
        />
      </Link>
      <footer className='space-y-2.5 p-2'>
        <section className='flex items-center gap-x-2'>
          <div className={twJoin('grow gap-x-1.5 rounded-xl p-1 text-white flex-center', color)}>
            {/* TODO: Temporal when api fix admin-pets */}
            {pet.breed?.category?.image && (
              <>
                <span
                  className='flex-center *:size-4'
                  dangerouslySetInnerHTML={{ __html: pet.breed.category.image }}
                />
                <span>{pet.breed.name}</span>
              </>
            )}
          </div>
          {isEditable && <PetOptions pet={pet} />}
        </section>
        <section className='flex gap-x-1.5 text-sm'>
          <HiOutlineLocationMarker />
          <span>{pet.district_name}</span>
        </section>
      </footer>
    </article>
  )
}
