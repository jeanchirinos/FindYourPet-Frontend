'use client'

import { OTPInput as BaseOtpInput, REGEXP_ONLY_DIGITS } from 'input-otp'
import { twMerge } from 'tailwind-merge'

type Props = {
  validationCode: string
  setValidationCode: (code: string) => void
  onComplete: () => void
}

export function OtpInput(props: Props) {
  const { validationCode, setValidationCode, onComplete } = props

  return (
    <BaseOtpInput
      autoFocus
      onComplete={onComplete}
      value={validationCode}
      onChange={setValidationCode}
      maxLength={6}
      allowNavigation
      pattern={REGEXP_ONLY_DIGITS}
      render={({ slots }) => (
        <div className='flex'>
          {slots.map((slot, i) => (
            <Slot key={i} {...slot} />
          ))}
        </div>
      )}
    />
  )
}

function Slot(props: { char: string | null; isActive: boolean }) {
  const { char, isActive } = props

  return (
    <div
      className={twMerge(
        'relative h-14 w-10 border-y border-r border-foreground-400 outline outline-0 flex-center first:rounded-l-sm first:border-l last:rounded-r-sm',
        props.isActive && 'outline-1 outline-foreground-600',
      )}
    >
      <div>{char && <div>{char}</div>}</div>

      {isActive && char === null && <FakeCaret />}
    </div>
  )
}

function FakeCaret() {
  return (
    <div className='pointer-events-none absolute inset-0 animate-pulse flex-center'>
      <div className='h-3/5 w-px bg-foreground' />
    </div>
  )
}
