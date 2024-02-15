import NextImage from 'next/image'
import { Image as NextUiImage } from '@nextui-org/react'

type Props = React.ComponentProps<typeof NextUiImage>

export function Image(props: Props) {
  return <NextUiImage as={NextImage} {...props} />
}
