import { useEffect, useState } from 'react'

import { SubmitButton } from '@/components/SubmitButton'
import { Button } from '@/components/Button'
import { SetState } from '@/types'
import { useCountdownTimer } from 'use-countdown-timer'
import { handleResponse } from '@/utilities/handleResponse'
import { UseModal } from '@/components/Modal'
import { verifyMobile } from '@/controllers/User'
import { CodeInput } from './CodeVerificationInput'

type Props = {
  modal: UseModal
  secondsToResend: number
  setIsEditable: SetState<boolean>
  currentMobile: string
}

export function Step2(props: Props) {
  const { modal, secondsToResend, setIsEditable, currentMobile } = props

  const [validationCode, setValidationCode] = useState(Array.from({ length: 6 }, () => ''))

  const { countdown, start, reset, isRunning } = useCountdownTimer({
    timer: 1000 * secondsToResend,
    autostart: true,
  })

  // EFFECT
  useEffect(() => {
    const form = document.getElementById('form_codes_form') as HTMLFormElement
    if (!form) return

    const inputs = Array.from(form.getElementsByTagName('input'))
    const lastInput = inputs.at(-1)

    if (validationCode.every(code => code !== '') && document.activeElement === lastInput) {
      form.requestSubmit()
    }
  }, [validationCode])

  // FUNCTIONS
  async function handleVerifyMobileFormAction() {
    const code = validationCode.join('')

    const res = await verifyMobile({ code, mobile: currentMobile })

    handleResponse(res, {
      onSuccess() {
        modal.close()
        setIsEditable(false)
      },
      showSuccessToast: true,
    })
  }

  function handlePaste(e: React.ClipboardEvent<HTMLFormElement>) {
    e.preventDefault()

    const code = e.clipboardData.getData('Text').trim()
    if (code.length !== 6) return

    const form = document.getElementById('form_codes_form') as HTMLFormElement
    const inputs = Array.from(form.getElementsByTagName('input'))

    inputs.at(-1)?.focus()

    setValidationCode(code.split(''))
  }

  function handleResend() {
    reset()
    start()
  }

  // RENDER
  return (
    <form
      className='flex flex-col items-center gap-y-5 text-center'
      id='form_codes_form'
      action={handleVerifyMobileFormAction}
      onPaste={handlePaste}
    >
      <h2 className='max-w-[30ch] text-center'>
        Ingrese el código de verificación que se envió a su número de celular
      </h2>

      <section id='form_codes' className='flex justify-around gap-x-2'>
        {validationCode.map((code, index) => (
          <CodeInput
            key={index}
            autoFocus={index === 0}
            value={code}
            setValidationCode={setValidationCode}
          />
        ))}
      </section>

      {isRunning && <p>Podrás reenviar el código luego de {countdown / 1000} segundos </p>}

      {!isRunning && (
        <Button isDisabled={isRunning} onPress={handleResend}>
          Reenviar código
        </Button>
      )}

      <div className='flex gap-x-2'>
        <Button onClick={modal.close} className='grow'>
          Cerrar
        </Button>
        <SubmitButton className='grow'>Confirmar</SubmitButton>
      </div>
    </form>
  )
}
