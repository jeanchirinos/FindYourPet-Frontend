import Image from 'next/image'
import { IoLocationSharp } from 'react-icons/io5'
import { twJoin } from 'tailwind-merge'

export function Card(props: { id: number; name: string; location: string; image: string }) {
  const colors = ['bg-pink-300', 'bg-red-300', 'bg-purple-300']
  
  return (
    <div className='flex flex-col gap-2 rounded-xl border-3 border-[#9c9b9b] p-4'>
      <header className={twJoin('rounded-lg p-3 text-center', colors[props.id - 1])}>
        <h1 className='text-lg font-semibold text-neutral-100'>{props.name}</h1>
      </header>
      <Image
        className='h-auto w-full object-cover'
        src={props.image}
        width='600'
        height='600'
        alt='Lechonk aesthetic'
      />
      <footer className='flex items-center gap-1.5'>
        <IoLocationSharp />
        <p className='text-neutral-600'>{props.location}</p>
      </footer>
    </div>
  )
}
