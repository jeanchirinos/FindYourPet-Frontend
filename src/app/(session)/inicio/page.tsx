import { Image } from '@/components/Image'
import ImgHeroImage from '@/public/img/inicio/hero-image.webp'
import SvgVercel from '@/public/img/inicio/vercel.svg'

import { Button } from '@/components/Button'
import { IconForward } from '@/icons'
import { Services } from './services'
import { Link } from '@/components/Link'

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
              color='primary'
              variant='shadow'
              className='bg-main-gradient'
              endContent={<IconForward />}
            >
              Ver mascotas
            </Button>
          </div>
        </div>
      </section>

      <Services />
      <footer className='px-2 pt-16'>
        <div className='mx-auto flex w-fit items-center gap-x-2'>
          <p>Desplegado en</p>
          <Link color='foreground' isExternal href='https://vercel.com/' aria-label='Vercel'>
            <SvgVercel className='w-20' />
          </Link>
        </div>

        <p className='pt-5 text-center text-foreground-600'>
          Desarrollado por{' '}
          <Link
            href='https://rafaellafernandez.vercel.app/'
            isExternal
            showAnchorIcon
            color='foreground'
            size='sm'
            underline='always'
          >
            Rafaella Fernández
          </Link>{' '}
          y{' '}
          <Link
            href='https://jeanchirinos.vercel.app/'
            isExternal
            showAnchorIcon
            color='foreground'
            size='sm'
            underline='always'
          >
            Jean Chirinos
          </Link>
        </p>
      </footer>
    </main>
  )
}
