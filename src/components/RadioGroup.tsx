'use client'

// import { RadioGroup } from '@headlessui/react'

// const { Option, Label } = RadioGroup

// export { RadioGroup, Option as RadioOption, Label as RadioLabel }
// export { RadioGroup } from '@headlessui/react'

import { RadioGroup as HeadlessRadioGroup } from '@headlessui/react'

export function RadioGroup(props: React.ComponentProps<typeof HeadlessRadioGroup>) {
  return <HeadlessRadioGroup {...props} />
}

export function RadioOption(props: React.ComponentProps<typeof HeadlessRadioGroup.Option>) {
  return <HeadlessRadioGroup.Option {...props} />
}

export function RadioLabel(props: React.ComponentProps<typeof HeadlessRadioGroup.Label>) {
  return <HeadlessRadioGroup.Label {...props} />
}
