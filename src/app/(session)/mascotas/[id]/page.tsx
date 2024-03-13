import { getPetById } from '@/controllers/PetController/getPetById'
import { PageProps } from '@/types'
// import PetMap from './map'
import { PetStatusTag } from '@/components/business/PetStatusTag'
import { PetCard } from '../../(home)/Pets/PetCard'
import { ContactNumber } from './contactNumber'
import { twJoin } from 'tailwind-merge'
import { Metadata } from 'next'
import { Image } from '@/components/Image'
import { IconLocation } from '@/icons'

type Props = PageProps<'id'>

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { pet } = await getPetById(props.params.id)

  return {
    title: `Mascota ${props.params.id}`,
    openGraph: {
      images: [pet.image.image],
    },
    description: pet.description,
  }
}

export default async function Page(props: Props) {
  const { pet, morePets } = await getPetById(props.params.id)

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
    <div className='mx-auto w-[1600px] max-w-full space-y-10 px-2'>
      <section className='flex gap-x-10 gap-y-2 max-md:flex-col'>
        <picture className='relative max-h-full min-h-80 shrink-0 animate-fade-up overflow-hidden rounded-md animate-duration-300 md:min-h-[34rem] md:w-[45%]'>
          <Image
            src={pet.image.image}
            width={pet.image.width || 500}
            height={pet.image.height || 500}
            alt={pet.id.toString()}
            className='absolute size-full object-cover'
            priority
          />
        </picture>
        <div className='flex grow flex-col gap-y-5'>
          <PetStatusTag pet={pet} />
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
                <div className='flex flex-col'>
                  <span className='text-small text-foreground-500'>{pet.user.username}</span>
                  {/* @ts-ignore */}
                  <span className='text-foreground-600'>{pet.user.email}</span>
                </div>
              </div>

              <p>{pet.description}</p>
            </div>

            <div className='flex flex-col gap-y-3'>
              <div className='flex items-baseline gap-x-1'>
                <IconLocation />
                <span className='text-foreground-600'>{pet.district_name}</span>
              </div>
              {/*@ts-ignore */}
              {pet.user.mobile && <ContactNumber id={pet.id} phoneNumber={pet.user.mobile} />}
            </div>
          </section>
        </div>
      </section>
      {morePets.length && (
        <section className='space-y-4'>
          <h2 className={twJoin('text-2xl font-semibold', petState.textClassName)}>
            Más mascotas {petState.text}
          </h2>
          <div className='templateColumns-[200px] grid grow auto-rows-min gap-4 lg:templateColumns-[300px]'>
            {morePets.map(pet => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
