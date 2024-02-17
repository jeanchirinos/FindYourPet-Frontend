import { IconPet } from '@/icons'

export default function Page() {
  return (
    <main className='mx-auto w-[1600px] max-w-full'>
      <div className='h-60 flex-col gap-y-4 rounded-md border border-dashed border-foreground-300 text-foreground-600 flex-center'>
        <IconPet className='animate-wiggle text-4xl' />
        <p>Aquí encontrarás tus publicaciones</p>
      </div>
    </main>
  )
}
