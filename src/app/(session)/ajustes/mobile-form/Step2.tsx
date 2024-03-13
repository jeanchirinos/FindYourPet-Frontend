import { useRef, useState } from 'react'
import { SubmitButton } from '@/components/SubmitButton'
import { Button } from '@nextui-org/button'
import { useCountdownTimer } from 'use-countdown-timer'
import { handleResponse } from '@/utilities/handleResponse'
import { UseModal } from '@/components/Modal'
import { verifyMobile } from '@/controllers/UserController/verifyMobile'
import { OtpInput } from './OtpInput'

type Props = {
  modal: UseModal
  secondsToResend: number
  currentMobile: string
}

export function Step2(props: Props) {
  const { modal, secondsToResend, currentMobile } = props

  const [validationCode, setValidationCode] = useState('')

  const { countdown, start, reset, isRunning } = useCountdownTimer({
    timer: 1000 * secondsToResend,
    autostart: true,
  })

  // FUNCTIONS
  async function handleVerifyMobileFormAction() {
    const res = await verifyMobile({ code: validationCode, mobile: currentMobile })

    handleResponse(res, {
      onSuccess() {
        modal.close()
      },
      showSuccessToast: true,
    })
  }

  function handleResend() {
    reset()
    start()
  }

  const isDisabled = validationCode.length !== 6

  const formRef = useRef<HTMLFormElement>(null)

  // RENDER
  return (
    <form
      className='flex flex-col items-center gap-y-5 text-center'
      action={handleVerifyMobileFormAction}
      ref={formRef}
    >
      <span className='max-w-[30ch] text-center'>
        Ingrese el código de verificación que se envió a su número de celular
      </span>

      <OtpInput
        validationCode={validationCode}
        setValidationCode={setValidationCode}
        onComplete={() => formRef.current?.requestSubmit()}
      />

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
        <SubmitButton isDisabled={isDisabled} className='grow'>
          Confirmar
        </SubmitButton>
      </div>
    </form>
  )
}
