import { requestActionData } from '@/utilities/actionsRequest'
import { IoLocationSharp } from 'react-icons/io5'
import { twJoin } from 'tailwind-merge'

import { Masonry, ResponsiveMasonry } from '@/components/Masonry'
import Image from 'next/image'

type Pet = {
  id: number
  breed_id: number
  user_id: number
  image: string
  description: string
  city: string
  district: string
  location: string
  status: number
  image_width: number
  image_height: number
  status_name: string
  breed: {
    id: number
    name: string
  }
  user: {
    id: number
    username: string
    image: string
  }
}

async function getPets() {
  const response = await requestActionData<Pet[]>('pet')

  if (response.status === 'error') return []

  return response.data
}

export default async function Page() {
  const pets = await getPets()

  return (
    <main className='animate-fade px-2 pb-2 animate-duration-200'>
      <section className='mb-10 mt-5 flex w-full justify-center'>
        <div className='w-[800px] max-w-full'>
          <div className='flex'>
            <div className='relative w-fit rounded-t-lg border border-[#822527] p-2 text-left before:absolute before:-bottom-1 before:left-0 before:h-[5px] before:w-full before:bg-white'>
              <button className='px-2 focus:border-b focus:border-[#8E3B2A]'>Se busca</button>
              <button className='px-2 focus:border-b focus:border-[#C4744E]'>En la calle</button>
              <button className='px-2 focus:border-b focus:border-[#DCB672]'>En adopción</button>
            </div>
          </div>
          <div className='flex flex-wrap gap-3 rounded-lg rounded-tl-none border border-[#822527] p-2 text-left'>
            <select name='' id='' className='rounded-xl border border-[#444041] px-3 py-2'>
              <option value='1'>Especie</option>
            </select>
            <input
              type='search'
              placeholder='Buscar'
              className='grow rounded-xl border border-[#444041] px-3 py-1'
            />
            <button className='rounded-md border-2 border-black bg-[#822527] px-3 py-2 text-white'>
              Buscar
            </button>
          </div>
        </div>
      </section>

      {/* @ts-ignore */}
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 300: 1, 450: 2, 900: 4 }}
        className='mx-auto w-[1600px] max-w-full'
      >
        {/*@ts-ignore */}
        <Masonry gutter='1.2rem'>
          {pets.map(pet => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </main>
  )
}

function PetCard(props: { pet: Pet }) {
  const { pet } = props

  const colors = ['bg-pink-300', 'bg-red-300', 'bg-purple-300']
  const cardColor = colors[pet.status - 1]

  return (
    <div className='flex flex-col gap-2 rounded-xl border-3 border-[#9c9b9b] p-4'>
      <header className={twJoin('rounded-lg p-3 text-center', cardColor)}>
        <h2 className='text-lg font-semibold text-neutral-100'>{pet.status_name}</h2>
      </header>
      <Image
        className='h-auto w-full object-cover'
        // style={{ maxWidth: `${pet.image_width}px`, maxHeight: `${pet.image_height}px` }}
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
