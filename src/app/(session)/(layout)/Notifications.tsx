import { IconNotification } from '@/icons'
import { Badge } from '@nextui-org/badge'

export function Notifications() {
  return (
    <>
      <Badge color='danger' content={5} isInvisible={false} shape='circle'>
        <IconNotification size={24} className='text-foreground-600' />
      </Badge>
    </>
  )
}
