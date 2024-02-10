import { TGetPetParams, getPets } from '@/controllers/Pet'
import { IconPet } from '@/icons'
import { PetCard } from './PetCard'

type Props = { searchParams: TGetPetParams }

export async function PetGrid(props: Props) {
  const { data: pets } = await getPets(props.searchParams)

  if (pets.length === 0)
    return (
      <div className='h-96 flex-col gap-y-4 flex-center'>
        <IconPet className='animate-wiggle text-5xl' />
        <p className='text-center text-xl'>No se encontraron mascotas</p>
      </div>
    )

  return (
    <div className='templateColumns-[200px] grid grow auto-rows-min gap-4 lg:templateColumns-[250px]'>
      {pets.map(pet => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </div>
  )
}
