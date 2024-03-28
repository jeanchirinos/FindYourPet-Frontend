import { Button } from '@nextui-org/button'
import Link from 'next/link'

type Props = React.ComponentProps<typeof Button<typeof Link>> & {
  innerRef?: React.Ref<HTMLButtonElement>
}

export function ButtonLink(props: Props) {
  const { innerRef, ...restProps } = props

  return <Button as={Link} role='link' {...restProps} ref={innerRef} />
}
