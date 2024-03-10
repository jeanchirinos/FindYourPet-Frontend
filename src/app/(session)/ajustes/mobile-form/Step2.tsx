import { useState } from 'react'
import { SubmitButton } from '@/components/SubmitButton'
import { Button } from '@nextui-org/button'
import { SetState } from '@/types'
import { useCountdownTimer } from 'use-countdown-timer'
import { handleResponse } from '@/utilities/handleResponse'
import { UseModal } from '@/components/Modal'
import { verifyMobile } from '@/controllers/UserController/verifyMobile'
import { OtpInput } from './OtpInput'
import { toast } from 'sonner'

type Props = {
  modal: UseModal
  secondsToResend: number
  setInputIsEditable: SetState<boolean>
  currentMobile: string
}

export function Step2(props: Props) {
  const { modal, secondsToResend, setInputIsEditable, currentMobile } = props

  const [validationCode, setValidationCode] = useState('')

  const { countdown, start, reset, isRunning } = useCountdownTimer({
    timer: 1000 * secondsToResend,
    autostart: true,
  })

  // FUNCTIONS
  async function handleVerifyMobileFormAction() {
    if (validationCode.length !== 6) return toast.error('El código debe tener 6 dígitos')

    const res = await verifyMobile({ code: validationCode, mobile: currentMobile })

    handleResponse(res, {
      onSuccess() {
        modal.close()
        setInputIsEditable(false)
      },
      showSuccessToast: true,
    })
  }

  function handleResend() {
    reset()
    start()
  }

  // RENDER
  return (
    <form
      className='flex flex-col items-center gap-y-5 text-center'
      action={handleVerifyMobileFormAction}
    >
      <h2 className='max-w-[30ch] text-center'>
        Ingrese el código de verificación que se envió a su número de celular
      </h2>

      <OtpInput
        validationCode={validationCode}
        setValidationCode={setValidationCode}
        onComplete={handleVerifyMobileFormAction}
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
        <SubmitButton className='grow'>Confirmar</SubmitButton>
      </div>
    </form>
  )
}
