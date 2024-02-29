export function ContactNumber(props: { id: string | number; phoneNumber: string }) {
  const message = `Hola, vi este anuncio ${process.env.NEXT_PUBLIC_APP_URL}/mascotas/${props.id} por PetContrado, `

  const url = new URL('https://api.whatsapp.com/send/')
  url.searchParams.set('phone', `+51${props.phoneNumber}`)
  url.searchParams.set('text', message)

  // separte the number in groups of 3
  const numberToShow = props.phoneNumber.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')

  return (
    <a href={url.toString()} target='_blank' rel='noreferrer'>
      {numberToShow}
    </a>
  )
}
