import { getPetById } from '@/controllers/PetController/getPetById'
import { PageProps } from '@/types'
// import PetMap from './map'
import { ContactNumber } from './components/contactNumber'
import { Metadata } from 'next'
import { Image } from '@/components/Image'
import { IconLocation, IconMap } from '@/icons'
import { Suspense } from '@/components/other/CustomSuspense'
import { MorePets } from './components/more-pets'
import { cn } from '@/lib/utils'

type Props = PageProps<'id'>

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { pet } = await getPetById(props.params.id)

  return {
    title: {
      absolute: `${pet.status_name} | ${pet.breed.name} en ${pet.district_name} | ${props.params.id}`,
    },

    openGraph: {
      images: [pet.image.image],
    },
    description: pet.description,
  }
}

export default async function Page(props: Props) {
  const { pet } = await getPetById(props.params.id)

  const colors = {
    1: 'bg-search',
    2: 'bg-lost',
    3: 'bg-adopt',
  }

  const color = colors[pet.status]

  return (
    <div className='mx-auto w-[1600px] max-w-full space-y-10 px-2'>
      <section className='flex gap-x-10 gap-y-2 max-md:flex-col'>
        <picture className='relative max-h-full min-h-80 shrink-0 animate-fade-up overflow-hidden rounded-md animate-duration-300 md:min-h-[34rem] md:w-[45%]'>
          <Image
            src={pet.image.image}
            width={pet.image.width}
            height={pet.image.height}
            alt={pet.id.toString()}
            className='absolute size-full object-cover'
            priority
          />
        </picture>
        <div className='flex grow flex-col gap-y-5'>
          <span
            className={cn('rounded-lg p-1.5 text-center text-lg font-semibold text-white', color)}
          >
            {pet.status_name}
          </span>
          <section className='flex flex-col gap-y-12 rounded-md bg-foreground-200/50 px-4 py-5'>
            <div className='flex flex-col gap-y-4'>
              <div className='flex items-center gap-x-2'>
                <Image
                  src={pet.user.image}
                  alt={pet.user.username}
                  width={40}
                  height={40}
                  className='rounded-full'
                />
                <div className='flex flex-col text-small'>
                  <span className='text-foreground-600'>{pet.user.username}</span>
                  {/* @ts-ignore */}
                  <span className='text-foreground-500'>{pet.user.email}</span>
                </div>
              </div>

              <p>{pet.description}</p>
            </div>

            <div className='flex flex-col gap-y-6'>
              <div>
                {pet.location && (
                  <div className='flex items-center gap-x-1.5'>
                    <IconLocation />
                    <span className='text-foreground-500'>{pet.location}</span>
                  </div>
                )}
                <div className='flex items-center gap-x-1.5'>
                  <IconMap />
                  <span className='text-foreground-600'>{pet.district_name}</span>
                </div>
              </div>
              {/*@ts-ignore */}
              {pet.status_name !== 'Perdido' && pet.user.mobile && (
                // @ts-ignore
                <ContactNumber id={pet.id} phoneNumber={pet.user.mobile} />
              )}
            </div>
          </section>
        </div>
      </section>
      <Suspense>
        <MorePets pet={pet} />
      </Suspense>
    </div>
  )
}
