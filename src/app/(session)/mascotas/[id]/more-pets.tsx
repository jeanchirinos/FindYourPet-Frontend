import { getMorePets } from '@/controllers/PetController/getMorePets'
import { Pet } from '@/models/Pet'
import { cn } from '@/lib/utils'

import { PetCard } from '../../(index)/Pets/PetCard'

export async function MorePets(props: { pet: Pet }) {
  const { pet } = props

  const { morePets } = await getMorePets(pet.id)

  const states = {
    1: {
      text: 'buscadas',
      textClassName: 'text-search',
    },
    2: {
      text: 'perdidas',
      textClassName: 'text-lost',
    },
    3: {
      text: 'en adopción',
      textClassName: 'text-adopt',
    },
  }

  const petState = states[Number(pet.status) as keyof typeof states]

  return (
    <>
      {morePets.length && (
        <section className='space-y-4'>
          <h2 className={cn('text-2xl font-semibold', petState.textClassName)}>
            Más mascotas {petState.text}
          </h2>
          <div className='templateColumns-[200px] grid grow auto-rows-min gap-4 lg:templateColumns-[300px]'>
            {morePets.map(pet => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
