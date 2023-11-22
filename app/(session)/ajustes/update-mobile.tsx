'use client'
import { updateMobile, verifyMobile } from '@/controllers/User'
import { Input } from '@/components/Input'
import React, { useEffect, useState } from 'react'

import { SubmitButton } from '@/components/SubmitButton'
import { Modal, UseModal, useModal } from '@/components/Modal'
import { Button } from '@/components/Button'
import { TUseSteps, useSteps } from '@/hooks/useSteps'
import { SetState } from '@/types'
import { useCountdownTimer } from 'use-countdown-timer'
import { handleResponse } from '@/utilities/handleResponse'
import { useAutoInput } from './update-form'

export function MobileForm(props: { initialMobile: string }) {
  const { initialMobile } = props

  // STATES
  const [secondsToResend, setSecondsToResend] = useState(0)

  // HOOKS
  const useAutoInputHook = useAutoInput({ initialValue: initialMobile })

  const {
    currentValue,
    setCurrentValue,
    inputIsEditable,
    setInputIsEditable,
    inputRef,
    submitButtonRef,
    submittingRef,
    handleBlur,
    handleKeyDown,
  } = useAutoInputHook

  const updateMobileModal = useModal()

  const useStepsHook = useSteps()
  const { currentStep, resetSteps } = useStepsHook

  // FUNCTIONS

  function handleSubmit(e: React.FormEvent) {
    submittingRef.current = true
    e.preventDefault()

    if (isDisabled) return
    updateMobileModal.open()
  }

  // VALUES
  const isDisabled = initialMobile === currentValue || !/^9[0-9]{8}$/.test(currentValue)

  // RENDER
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='mt-4 flex items-center gap-x-2'
        onKeyDown={handleKeyDown}
      >
        <Input
          type='text'
          name='mobile'
          label='Móvil'
          isRequired={false}
          value={currentValue}
          minLength={9}
          maxLength={9}
          pattern='^9[0-9]{8}$'
          onChange={e => {
            const value = e.target.value
            if (isNaN(Number(value))) return
            setCurrentValue(e.target.value)
          }}
          onFocus={() => setInputIsEditable(true)}
          onBlur={handleBlur}
          ref={inputRef}
        />

        {inputIsEditable && (
          <div className='flex gap-x-1.5'>
            <Button
              size='sm'
              isDisabled={isDisabled}
              disabled={isDisabled}
              className='bg-primary text-white disabled:opacity-60'
              type='submit'
              ref={submitButtonRef}
            >
              Guardar
            </Button>
          </div>
        )}
      </form>

      <Modal
        modal={updateMobileModal}
        onExitComplete={() => {
          resetSteps()
          setTimeout(() => {
            setInputIsEditable(false)
            setCurrentValue(initialMobile)
            submittingRef.current = false
          }, 1)
        }}
      >
        {currentStep === 1 && (
          <Step1
            useStepsHook={useStepsHook}
            currentMobile={currentValue}
            modal={updateMobileModal}
            setSecondsToResend={setSecondsToResend}
          />
        )}

        {currentStep === 2 && (
          <Step2
            modal={updateMobileModal}
            secondsToResend={secondsToResend}
            setIsEditable={setInputIsEditable}
            currentMobile={currentValue}
          />
        )}
      </Modal>
    </>
  )
}

function Step1(props: {
  useStepsHook: TUseSteps
  currentMobile: string
  modal: UseModal
  setSecondsToResend: SetState<number>
}) {
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

function Step2(props: {
  modal: UseModal
  secondsToResend: number
  setIsEditable: SetState<boolean>
  currentMobile: string
}) {
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
      className='flex flex-col justify-center gap-y-5 text-center'
      id='form_codes_form'
      action={handleVerifyMobileFormAction}
      onPaste={handlePaste}
    >
      <h2 className='max-w-[30ch]'>
        Ingrese el código de verificación que se envió a su número de celular
      </h2>

      <section id='form_codes' className='flex justify-around'>
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

      <div className='flex gap-x-1'>
        <Button onClick={modal.close} className='grow'>
          Cerrar
        </Button>
        <SubmitButton className='grow'>Confirmar</SubmitButton>
      </div>
    </form>
  )
}

function CodeInput(
  props: React.ComponentProps<'input'> & { setValidationCode: SetState<string[]> },
) {
  const { setValidationCode: setValidationCodes, ...otherProps } = props

  // FUNCTIONS
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value

    if (value.length > 1) return

    const form = document.getElementById('form_codes') as HTMLFormElement
    const inputs = Array.from(form.getElementsByTagName('input'))

    const currInputIndex = inputs.indexOf(e.currentTarget)

    setValidationCodes(prev => {
      const newValidationCode = [...prev]
      newValidationCode[currInputIndex] = e.target.value
      return newValidationCode
    })

    if (!value) return

    const input = inputs[currInputIndex + 1]
    input?.focus()
  }

  function handleKeydown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!e.currentTarget.value && e.key === 'Backspace') {
      const form = document.getElementById('form_codes')!
      const inputs = Array.from(form.getElementsByTagName('input'))

      const currInputIndex = inputs.indexOf(e.currentTarget)

      const input = inputs[currInputIndex - 1]

      input?.focus()
    }
  }

  // RENDER
  return (
    <input
      {...otherProps}
      className='aspect-square h-10 rounded-full bg-foreground-200 text-center'
      onChange={handleChange}
      onKeyDown={handleKeydown}
      type='number'
      min={0}
      max={9}
      maxLength={1}
    />
  )
}
