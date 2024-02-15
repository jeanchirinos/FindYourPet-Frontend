import NextImage from 'next/image'

type Props = React.ComponentProps<typeof NextImage>

export function Image(props: Props) {
  return <NextImage {...props} />
}
