import { Image } from '@/components/Image'
import ImgHeroImage from '@/public/img/inicio/hero-image.webp'
import SvgVercel from '@/public/img/inicio/vercel.svg'

import { Button } from '@/components/Button'
import Link from 'next/link'
import { IconForward } from '@/icons'
import { Services } from './services'

export default function Page() {
  return (
    <main>
      <section className='-mt-20 bg-custom1 py-header_sticky'>
        <div className='mx-auto flex w-[1600px] max-w-full flex-col items-center justify-around gap-10 px-2 pt-8 lg:flex-row-reverse'>
          <Image
            src={ImgHeroImage}
            alt='Animales'
            className='max-h-60 w-auto animate-appearance-in lg:max-h-[30rem]'
            priority
          />

          <div className='space-y-5'>
            <div className='text-4xl font-bold lg:text-7xl'>
              <p>Encuentra a tu</p>
              <p className='inline-block bg-main-gradient bg-clip-text text-transparent'>Mascota</p>
            </div>

            <p className='max-w-[40ch] lg:text-xl'>
              Conecta a dueños y amantes de animales para localizar mascotas perdidas, facilitar
              adopciones y reportar hallazgos de animales extraviados.
            </p>

            <Button
              as={Link}
              href='/'
              variant='shadow'
              color='primary'
              className='bg-main-gradient'
            >
              <span>Ver mascotas</span>
              <IconForward className='' />
            </Button>
          </div>
        </div>
      </section>

      <Services />
      <footer className='px-2 pt-16'>
        <a
          href='https://vercel.com/'
          target='_blank'
          className='mx-auto flex w-fit items-center gap-x-2'
          rel='noreferrer'
        >
          <p>Desplegado en</p>
          <SvgVercel className='w-20' />
        </a>

        <p className='pt-5 text-center text-foreground-600'>
          Desarrollado por{' '}
          <a href='https://rafaellafernandez.vercel.app/' target='_blank' rel='noreferrer'>
            Rafaella F.
          </a>{' '}
          y{' '}
          <a href='https://jeanchirinos.vercel.app/' target='_blank' rel='noreferrer'>
            Jean C.
          </a>
        </p>
      </footer>
    </main>
  )
}
