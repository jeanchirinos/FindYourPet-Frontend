import { Image } from '@/components/Image'
import ImgHeroImage from '@/public/img/inicio/hero-image.webp'
import SvgVercel from '@/public/img/inicio/vercel.svg'
import { IconForward } from '@/icons'
import { Services } from './components/services'
import { Link } from '@/components/Link'
import { ROUTE } from '@/routes'
import { ButtonLink } from '@/components/ButtonLink'

export default function Page() {
  return (
    <main>
      <section className='-mt-20 bg-primary/20 py-header_sticky'>
        <div className='mx-auto flex w-[1600px] max-w-full flex-col items-center justify-around gap-10 px-2 pt-8 lg:flex-row-reverse'>
          <Image
            src={ImgHeroImage}
            alt='Animales'
            className='h-60 w-auto animate-appearance-in lg:h-[30rem]'
            priority
          />
          <div className='space-y-5'>
            <h1 className='text-4xl font-bold lg:text-7xl'>
              <span>Encuentra a tu</span>{' '}
              <span className='inline-block bg-main-gradient bg-clip-text text-transparent'>
                Mascota
              </span>
            </h1>

            <p className='max-w-[40ch] lg:text-xl'>
              Conecta a dueños y amantes de animales para localizar mascotas perdidas, facilitar
              adopciones y reportar hallazgos de animales extraviados.
            </p>

            <ButtonLink
              href={ROUTE.PETS.INDEX}
              color='primary'
              variant='shadow'
              className='bg-main-gradient'
              endContent={<IconForward />}
            >
              Ver mascotas
            </ButtonLink>
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
