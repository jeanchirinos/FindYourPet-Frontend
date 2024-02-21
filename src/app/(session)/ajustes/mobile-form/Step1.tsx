import { updateMobile } from '@/controllers/User'

import { SubmitButton } from '@/components/SubmitButton'
import { UseModal } from '@/components/Modal'
import { Button } from '@/components/Button'
import { TUseSteps } from '@/hooks/useSteps'
import { SetState } from '@/types'

type Props = {
  useStepsHook: TUseSteps
  currentMobile: string
  modal: UseModal
  setSecondsToResend: SetState<number>
}

export function Step1(props: Props) {
  const { useStepsHook, currentMobile, modal, setSecondsToResend } = props
  const { nextStep } = useStepsHook

  // FUNCTIONS
  async function handleMobileFormAction() {
    const res = await updateMobile({ mobile: currentMobile })

    if (res.ok) {
      setSecondsToResend(res.data.seconds)
      nextStep()
    }
  }

  return (
    <form
      className='flex flex-col justify-center gap-y-5 text-center'
      action={handleMobileFormAction}
    >
      <h2 className='max-w-[30ch]'>Se enviará un código de verificación a tu número de celular</h2>

      <div className='flex justify-center gap-x-2'>
        <Button onClick={modal.close}>Cancelar</Button>
        <SubmitButton autoFocus>Confirmar</SubmitButton>
      </div>
    </form>
  )
}
