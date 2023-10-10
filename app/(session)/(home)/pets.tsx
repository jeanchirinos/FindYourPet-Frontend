'use client'

import Image from 'next/image'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { Pet } from './page'
import { twJoin } from 'tailwind-merge'
import { IoLocationSharp } from 'react-icons/io5'

export function Pets(props: { pets: Pet[] }) {
  const { pets } = props

  return (
    //@ts-ignore
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 450: 2, 900: 4 }}
      className='mx-auto w-[1600px] max-w-full'
    >
      {/*@ts-ignore */}
      <Masonry gutter='1.2rem'>
        {pets.map(pet => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  )
}

export function PetCard(props: { pet: Pet }) {
  const { pet } = props

  const colors = ['bg-pink-300', 'bg-red-300', 'bg-purple-300']

  return (
    <div className='flex flex-col gap-2 rounded-xl border-3 border-[#9c9b9b] p-4'>
      <header className={twJoin('rounded-lg p-3 text-center', colors[pet.status - 1])}>
        <h2 className='text-lg font-semibold text-neutral-100'>{pet.status_name}</h2>
      </header>
      <Image
        className='h-auto w-full object-cover'
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
