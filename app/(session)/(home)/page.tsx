import { twJoin, twMerge } from 'tailwind-merge'
import Image from 'next/image'
import { Suspense } from 'react'
import { getPets } from '@/mc/Pet'
import { PetPaginate } from '@/types'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { HiOutlineLocationMarker } from 'react-icons/hi'

export default function Page(props: { searchParams: { page: string | undefined } }) {
  const { page } = props.searchParams

  return (
    <main className='animate-fade px-2 pb-2 pt-12 animate-duration-200'>
      <div className='mx-auto w-[1600px] max-w-full'>
        <Suspense fallback={<GridSkeleton />}>
          <PetMasonry page={page} />
        </Suspense>
      </div>
    </main>
  )
}

function GridSkeleton() {
  return (
    <>
      <section className='templateColumns-[300px] grid gap-4'>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className='aspect-square animate-pulse rounded-xl bg-neutral-200' />
        ))}
      </section>
    </>
  )
}

async function PetMasonry(props: { page: string | undefined }) {
  const petsData = await getPets({ page: props.page })

  const { data: pets, links, current_page } = petsData

  if (pets.length === 0 && current_page !== 1) {
    redirect('/404')
  }

  return (
    <>
      <div className='templateColumns-[300px] grid gap-4'>
        {pets.map(pet => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>

      <div className='flex justify-center gap-x-2 py-5'>
        {links.map(link => {
          if (link.url === null) return null

          const url = '?' + link.url.split('?')[1]

          return (
            <Link
              href={url}
              key={link.label}
              className={twMerge(
                'rounded-lg bg-neutral-200 p-2',
                link.active && 'bg-black text-white',
              )}
            >
              {link.label}
            </Link>
          )
        })}
      </div>
    </>
  )
}

function PetCard(props: { pet: PetPaginate['data'][0] }) {
  const { pet } = props

  const colors = ['bg-[#79616F]', 'bg-[#AE6378]', 'bg-[#7E9680]']
  const cardColor = colors[pet.status - 1]

  return (
    <div className='flex flex-col gap-2 overflow-hidden rounded-xl bg-[#FFF3E5] pb-4'>
      <Image
        className='aspect-square w-full object-cover'
        src={pet.image}
        width={pet.image_width}
        height={pet.image_height}
        alt='Mascota'
      />
      <div className='space-y-3 px-4'>
        <section
          className={twJoin(
            'rounded-3xl p-2 text-center text-lg font-semibold text-white',
            cardColor,
          )}
        >
          {pet.status_name}
        </section>
        <footer className='flex items-center gap-1.5'>
          <HiOutlineLocationMarker />
          <p className='text-neutral-600'>
            {pet.city}, {pet.district}
          </p>
        </footer>
      </div>
    </div>
  )
}
