import { Suspense } from '@/components/other/CustomSuspense'
import { getPetById, getPets } from '@/controllers/Pet'
import { PageProps } from '@/types'
import Image from 'next/image'
// import PetMap from './map'
import { Skeleton } from '@nextui-org/react'
import { PetStatusTag } from '@/components/business/PetStatusTag'
import { PetCard } from '../../(home)/Pets/PetCard'
import { ContactNumber } from './contactNumber'

type Props = PageProps<'id'>

export default function Page(props: Props) {
  return (
    <Suspense>
      <Content petId={props.params.id} />
    </Suspense>
  )
}

async function Content(props: { petId: string }) {
  const { pet } = await getPetById(props.petId)

  return (
    <div className='mx-auto w-[1600px] max-w-full space-y-10 px-2'>
      <section className='flex gap-10 max-md:flex-col'>
        <picture className='relative aspect-[4/3] max-h-full min-h-80 w-[50%] shrink-0 overflow-hidden rounded-md'>
          <Image
            src={pet.image}
            width={500}
            height={500}
            // width={pet.image_width}
            // height={pet.image_height}
            alt={pet.id.toString()}
            // className='top-header_sticky h-min max-h-full w-[600px] max-w-full rounded-md object-cover md:sticky'
            className='absolute size-full object-cover'
          />
        </picture>
        <div className='flex grow flex-col gap-y-4'>
          <PetStatusTag pet={pet} />
          <div className='h-80 grow overflow-hidden rounded-md'>
            <Skeleton className='size-full' />
          </div>
          <section className='max-h-60 overflow-y-auto rounded-md bg-foreground-200 p-2 '>
            <h3>Descripción</h3>
            <p>{pet.description}</p>
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
        <h2 className='text-2xl font-semibold text-lost'>Más mascotas perdidas</h2>
        <Suspense>
          <MorePets />
        </Suspense>
      </section>
    </div>
  )
}

async function MorePets() {
  const { data: pets } = await getPets({ status: '1' })

  return (
    <div className='templateColumns-[200px] grid grow auto-rows-min gap-4 lg:templateColumns-[300px]'>
      {pets.map(pet => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </div>
  )
}
