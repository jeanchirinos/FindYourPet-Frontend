import { Button } from '@nextui-org/button'
import { cnx } from '@/lib/utils'

export function RadioItem(
  props: React.ComponentProps<typeof Button<'label'>> & {
    input?: React.ComponentProps<'input'>
  },
) {
  return (
    <>
      <Button
        {...props}
        as='label'
        role={null as any}
        className={cnx('cursor-pointer', props.className)}
      >
        {props.children}
        <input type='radio' required hidden {...props.input} />
      </Button>
    </>
  )
}
