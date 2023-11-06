'use client'
import { Button } from '@/components/Button'
import { useEffect } from 'react'

export default function Error(props: { error: Error & { digest?: string }; reset: () => void }) {
  const { error, reset } = props

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error)
  }, [error])

  return (
    <div className='fixed inset-0 z-10 flex flex-col items-center justify-center gap-y-2.5 bg-black text-white'>
      <h2>Hubo un error</h2>
      <Button onClick={() => reset()}>Volver a intentar</Button>
    </div>
  )
}
