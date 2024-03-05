import { IconPet } from '@/icons'
import { TGetPetParams, getPosts } from '@/controllers/Post'
import { Pagination } from '../../(home)/Pets/Pagination'
import { PetCard } from '../../(home)/Pets/PetCard'

type Props = { searchParams: TGetPetParams }

export async function PostsList(props: Props) {
  const { searchParams } = props

  const { data: posts, links } = await getPosts(searchParams)

  if (posts.length === 0)
    return (
      <div className='h-96 flex-col gap-y-4 flex-center'>
        <IconPet className='animate-wiggle text-5xl' />
        <p className='text-center text-xl'>No se encontraron publicaciones</p>
      </div>
    )

  return (
    <div className='flex w-full grow animate-fade-up flex-col gap-y-3.5 animate-duration-300'>
      <div className='templateColumns-[200px] grid grow auto-rows-min gap-4 lg:templateColumns-[250px]'>
        {posts.map((pet, i) => (
          <PetCard
            key={`${pet.id} + ${searchParams.published} + ${i}`}
            pet={pet}
            index={i}
            isEditable
          />
        ))}
      </div>
      <Pagination currentPage={searchParams.page as string} numberOfPages={links.length - 2} />
    </div>
  )
}
