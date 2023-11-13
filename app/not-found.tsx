import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='px-5 py-4 w-full h-screen flex flex-col items-center justify-center'>
      <h1 className='font-bold text-primary text-9xl'>404</h1>
      <h3 className='font-bold text-neutral-800 text-2xl'>Página no encontrada</h3>
      <Link href='/' className='bg-primary text-white px-4 py-2 rounded-full mt-2'>Volver al Inicio</Link>
    </div>
  )
}
