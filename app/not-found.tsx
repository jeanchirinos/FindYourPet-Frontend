import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center bg-foreground-900 px-5 py-4'>
      <h1 className='text-9xl font-bold text-primary'>404</h1>
      <h3 className='mb-5 text-2xl font-bold text-foreground-100'>Página no encontrada</h3>
      <Link href='/' className='mt-2 rounded-full bg-primary px-4 py-2 text-white'>
        Volver al Inicio
      </Link>
    </div>
  )
}
