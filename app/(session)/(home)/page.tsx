import { IoLocationSharp } from 'react-icons/io5'
import { twJoin, twMerge } from 'tailwind-merge'
import Image from 'next/image'
import { Suspense } from 'react'
import { getPets } from '@/mc/Pet'
import { PetPaginate } from '@/types'
import Link from 'next/link'
import { redirect } from 'next/navigation'

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

  const colors = ['bg-pink-300', 'bg-red-300', 'bg-purple-300']
  const cardColor = colors[pet.status - 1]

  return (
    <div className='flex flex-col gap-2 rounded-xl border-3 border-[#9c9b9b] p-4'>
      <header className={twJoin('rounded-lg p-3 text-center', cardColor)}>
        <h2 className='text-lg font-semibold text-neutral-100'>{pet.status_name}</h2>
      </header>
      <Image
        className='aspect-square w-full object-cover'
        src={pet.image}
        width={pet.image_width}
        height={pet.image_height}
        alt='Mascota'
      />
      <footer className='flex items-center gap-1.5'>
        <IoLocationSharp />
        <p className='text-neutral-600'>
          {pet.city}, {pet.district}
        </p>
      </footer>
    </div>
  )
}
