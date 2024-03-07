'use client'

import { Button } from '@nextui-org/button'

export default function Page() {
  function handleBack() {
    close()
  }

  return (
    <main className='min-h-dvh flex-col gap-y-6 px-2 text-center flex-center'>
      <section className='space-y-1.5'>
        <p className='text-lg font-bold'>El correo ya se encuentra vinculado</p>
        <p className='text-foreground-600'>
          Inicie sesión y agregue su correo como método de inicio de sesión
        </p>
      </section>
      <Button color='primary' onClick={handleBack}>
        Entendido
      </Button>
    </main>
  )
}
