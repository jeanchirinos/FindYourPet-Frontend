import { cn } from '@/lib/utils'
import { Pet } from '@/models/Pet'
import Link from 'next/link'
import { Image } from '@/components/Image'
import { PetOptions } from './PetOptions'
import { PetDecision } from './PetDecision'
import { IconForward, IconLocation } from '@/icons'
import { ROUTE } from '@/routes'

type Props = { pet: Pet; index?: number; isEditable?: boolean; isAdmin?: boolean }

export function PetCard(props: Props) {
  const { pet, index, isEditable, isAdmin } = props

  // VALUES
  const colors = {
    1: 'bg-search',
    2: 'bg-lost',
    3: 'bg-adopt',
  }

  const color = colors[pet.status]

  // RENDER
  return (
    <article className='flex flex-col overflow-hidden rounded-xl bg-custom1 shadow-small'>
      <PetImage pet={pet} isAdmin={isAdmin} index={index} />

      <footer className='space-y-2.5 p-2'>
        <section className='flex items-center gap-x-2'>
          <div className={cn('grow gap-x-1.5 rounded-xl p-1 text-white flex-center', color)}>
            <span
              className='flex-center *:size-4'
              dangerouslySetInnerHTML={{ __html: pet.breed.category.image }}
            />
            <span>{pet.breed.name}</span>
          </div>
          {isEditable && <PetOptions pet={pet} />}
        </section>
        <section className='flex gap-x-1.5 text-sm'>
          <IconLocation />
          <span>{pet.district_name}</span>
        </section>
        {isAdmin && <PetDecision pet={pet} />}
      </footer>
    </article>
  )
}

type PetImageProps = { pet: Pet; isAdmin?: boolean; index?: number }

function PetImage(props: PetImageProps) {
  const { pet, isAdmin, index } = props

  //@ts-ignore
  const isNotLinkeable = !isAdmin && pet.published === '0'

  const image = (
    <Image
      className={
        isNotLinkeable
          ? 'aspect-square w-full overflow-hidden object-cover'
          : 'absolute size-full object-cover transition-transform group-hover:scale-110'
      }
      src={pet.image.image}
      width={pet.image.width ?? 500}
      height={pet.image.height ?? 500}
      alt='Mascota'
      priority={index === 0}
    />
  )

  if (isNotLinkeable) {
    return image
  }

  return (
    <Link
      href={ROUTE.PETS.ID(pet.id)}
      className='group relative aspect-square w-full overflow-hidden'
    >
      <IconForward className='absolute right-2 top-2 z-10 hidden text-xl text-white group-hover:block' />
      {image}
    </Link>
  )
}
