import { TGetPetParams, getAllPetsAdmin } from '@/controllers/Pet'
import { IconPet } from '@/icons'
import { PetCard } from '@/app/(session)/(home)/Pets/PetCard'
import { Pagination } from '@/app/(session)/(home)/Pets/Pagination'

type Props = { searchParams: TGetPetParams }

export async function PetList(props: Props) {
  const { data: pets, links } = await getAllPetsAdmin(props.searchParams)

  if (pets.length === 0)
    return (
      <div className='h-96 flex-col gap-y-4 flex-center'>
        <IconPet className='animate-wiggle text-5xl' />
        <p className='text-center text-xl'>No se encontraron mascotas</p>
      </div>
    )

  return (
    <div className='flex w-full grow animate-fade-up flex-col gap-y-3.5 animate-duration-300'>
      <div className='templateColumns-[200px] grid grow auto-rows-min gap-4 lg:templateColumns-[250px]'>
        {pets.map((pet, i) => (
          <PetCard key={pet.id} pet={pet} index={i} />
        ))}
      </div>
      <Pagination
        currentPage={props.searchParams.page as string}
        numberOfPages={links.length - 2}
      />
    </div>
  )
}
