import SvgFind from '@/public/img/general/find.svg'
import SvgAlert from '@/public/img/general/alert.svg'
import SvgAdopt from '@/public/img/general/adopt.svg'
import { twJoin } from 'tailwind-merge'

export function Services() {
  return (
    <section className='mx-auto flex w-[1600px] max-w-full flex-wrap items-center justify-around gap-10 py-16'>
      <Card id={1} title='Encuentra' icon={<SvgFind />}>
        Perdiste a tu mascota y buscas reunirte con ella. Publica detalles sobre tu amigo peludo y
        recibe ayuda de la comunidad para encontrarlo.
      </Card>

      <Card id={2} title='Reporta' icon={<SvgAlert />}>
        Encontraste a un animal en la calle que parece tener dueño. Ayuda a reunirlo con su familia
        publicando detalles sobre el hallazgo.
      </Card>

      <Card id={3} title='Adopta' icon={<SvgAdopt />}>
        Buscas un hogar amoroso para un animalito que necesite adopción. Publica detalles sobre él
        para encontrarle un nuevo y cariñoso dueño.
      </Card>
    </section>
  )
}

function Card(props: {
  id: 1 | 2 | 3
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  const classNames = {
    1: {
      bg: 'bg-search',
      text: 'text-search',
    },
    2: {
      bg: 'bg-lost',
      text: 'text-lost',
    },
    3: {
      bg: 'bg-adopt',
      text: 'text-adopt',
    },
  }

  const { bg, text } = classNames[props.id]

  return (
    <article className='flex flex-col items-center gap-y-2 p-7'>
      <picture className={twJoin('flex size-32 rounded-full p-7 text-white', bg)}>
        {props.icon}
      </picture>
      <h2 className={twJoin('text-xl font-bold', text)}>{props.title}</h2>
      <p className='max-w-[35ch]'>{props.children}</p>
    </article>
  )
}
