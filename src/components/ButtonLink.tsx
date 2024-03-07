import { Button } from '@nextui-org/button'
import Link from 'next/link'

type Props = React.ComponentProps<typeof Button<typeof Link>>

export function ButtonLink(props: Props) {
  return <Button as={Link} {...props} />
}
