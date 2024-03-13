import { IconWhatsapp } from '@/icons'
import { ROUTE } from '@/routes'
import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
import { Snippet } from '@nextui-org/snippet'

export function ContactNumber(props: { id: string | number; phoneNumber: string }) {
  const message = `Hola, vi este anuncio ${process.env.NEXT_PUBLIC_APP_URL + ROUTE.PETS.ID(props.id)} por PetContrado, `

  const url = new URL('https://api.whatsapp.com/send/')
  url.searchParams.set('phone', `+51${props.phoneNumber}`)
  url.searchParams.set('text', message)

  // separte the number in groups of 3
  const numberToShow = props.phoneNumber.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')

  return (
    <div className='flex gap-x-2'>
      <Snippet hideSymbol tooltipProps={{ content: 'Copiar número' }}>
        {numberToShow}
      </Snippet>

      <Button
        as={Link}
        startContent={<IconWhatsapp />}
        isExternal
        href={url.toString()}
        showAnchorIcon
        className='bg-[#128C7E] text-white'
      >
        Whatsapp
      </Button>
    </div>
  )
}
