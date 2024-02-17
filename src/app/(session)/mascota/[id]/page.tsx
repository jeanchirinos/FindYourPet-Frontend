import { Suspense } from '@/components/other/CustomSuspense'
import { getPetById } from '@/controllers/Pet'
import { PageProps } from '@/types'
// import PetMap from './map'
import { Skeleton } from '@nextui-org/skeleton'
import { PetStatusTag } from '@/components/business/PetStatusTag'
import { PetCard } from '../../(home)/Pets/PetCard'
import { ContactNumber } from './contactNumber'
import { twJoin } from 'tailwind-merge'
import { Metadata } from 'next'
import { Image } from '@/components/Image'

type Props = PageProps<'id'>

export async function generateMetadata(props: Props): Promise<Metadata> {
  return {
    title: `Mascota ${props.params.id}`,
  }
}

export default function Page(props: Props) {
  return (
    <Suspense>
      <Content petId={props.params.id} />
    </Suspense>
  )
}

async function Content(props: { petId: string }) {
  const { pet, morePets } = await getPetById(props.petId)

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

  const petState = states[pet.status as keyof typeof states]

  return (
    <div className='mx-auto w-[1600px] max-w-full space-y-10 px-2'>
      <section className='flex gap-x-10 gap-y-2 max-md:flex-col'>
        <picture className='relative max-h-full min-h-80 shrink-0 overflow-hidden rounded-md md:w-[45%]'>
          <Image
            src={pet.image}
            width={pet.image_width || 500}
            height={pet.image_height || 500}
            alt={pet.id.toString()}
            className='absolute size-full object-cover'
            priority
          />
        </picture>
        <div className='flex grow flex-col gap-y-4'>
          {/* <p>Te pareció haberlo visto ?</p> */}

          <PetStatusTag pet={{ ...pet, status_name: 'Estado' }} />
          <div className='h-80 grow overflow-hidden rounded-md md:h-60 2xl:h-80'>
            <Skeleton className='size-full' />
          </div>
          <section className='max-h-60 overflow-y-auto rounded-md bg-foreground-200 p-2 '>
            <h3>Descripción</h3>
            <p>{pet.description}</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nisi quos harum.
              Facere, distinctio autem, fugit aliquam ab accusantium dolorem exercitationem optio
              eos labore ullam est iste commodi! Eveniet, culpa.
            </p>
          </section>
          <section className='space-y-2 rounded-md bg-foreground-200 p-2'>
            <h3>Contacto</h3>

            <div className='flex flex-col gap-y-1'>
              <p>Usuario</p>
              <p>alguien@gmail.com</p>
              <ContactNumber id={pet.id} phoneNumber='999999999' />
            </div>
          </section>
        </div>
      </section>
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
    </div>
  )
}
