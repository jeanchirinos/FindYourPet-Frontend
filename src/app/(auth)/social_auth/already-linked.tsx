'use client'

import { Button } from '@nextui-org/button'

export function AlreadyLinked() {
  function handleBack() {
    close()
  }

  return (
    <>
      <section className='space-y-1.5'>
        <p className='text-lg font-bold'>El correo ya se encuentra vinculado</p>
        <p className='text-foreground-600'>
          Inicie sesión y agregue su correo como método de inicio de sesión
        </p>
      </section>
      <Button color='primary' onClick={handleBack}>
        Entendido
      </Button>
    </>
  )
}
