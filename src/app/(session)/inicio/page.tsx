import { Image } from '@/components/Image'
import ImgHeroImage from '@/public/img/inicio/hero-image.webp'
import SvgVercel from '@/public/img/inicio/vercel.svg'
import SvgFind from '@/public/img/general/find.svg'
import SvgAlert from '@/public/img/general/alert.svg'
import SvgAdopt from '@/public/img/general/adopt.svg'
import { Button } from '@/components/Button'
import Link from 'next/link'
import { IconForward } from '@/icons'

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

      <section className='mx-auto flex w-[1600px] max-w-full flex-wrap items-center justify-around gap-10 py-16'>
        <article className='flex flex-col items-center gap-y-2'>
          <picture className='flex rounded-full bg-search p-7 text-white'>
            <SvgFind className='w-20' />
          </picture>
          <h2 className='text-xl font-bold text-search'>Encuentra</h2>
          <p className='max-w-[35ch]'>
            Perdiste a tu mascota y buscas reunirte con ella. Publica detalles sobre tu amigo peludo
            y recibe ayuda de la comunidad para encontrarlo.
          </p>
        </article>

        <article className='flex flex-col items-center gap-y-2'>
          <picture className='flex rounded-full bg-lost p-7 text-white'>
            <SvgAlert className='w-20' />
          </picture>
          <h2 className='text-xl font-bold text-lost'>Reporta</h2>
          <p className='max-w-[35ch]'>
            Encontraste a un animal en la calle que parece tener dueño. Ayuda a reunirlo con su
            familia publicando detalles sobre el hallazgo.
          </p>
        </article>

        <article className='flex flex-col items-center gap-y-2'>
          <picture className='flex rounded-full bg-adopt p-7 text-white'>
            <SvgAdopt className='w-20' />
          </picture>
          <h2 className='text-xl font-bold text-adopt'>Adopta</h2>
          <p className='max-w-[35ch]'>
            Buscas un hogar amoroso para un animalito que necesite adopción. Publica detalles sobre
            él para encontrarle un nuevo y cariñoso dueño.
          </p>
        </article>
      </section>

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
      </footer>
    </main>
  )
}
