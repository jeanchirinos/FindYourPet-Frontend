import {
  Popover as BasePopover,
  PopoverTrigger as BasePopoverTrigger,
  PopoverContent as BasePopoverContent,
} from '@nextui-org/react'

export function Popover(props: React.ComponentProps<typeof BasePopover>) {
  return <BasePopover {...props}>{props.children}</BasePopover>
}

export function PopoverTrigger(props: React.ComponentProps<typeof BasePopoverTrigger>) {
  return (
    <BasePopoverTrigger {...props}>
      <button>{props.children}</button>
    </BasePopoverTrigger>
  )
}

export function PopoverContent(props: React.ComponentProps<typeof BasePopoverContent>) {
  return <BasePopoverContent {...props}>{props.children}</BasePopoverContent>
}
