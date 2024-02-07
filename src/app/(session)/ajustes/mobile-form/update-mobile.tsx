'use client'
import { Input } from '@/components/Input'
import { useState } from 'react'

import { Modal, useModal } from '@/components/Modal'
import { Button } from '@/components/Button'
import { useSteps } from '@/hooks/useSteps'
import { useAutoInput } from '../data-form/useAutoInput'
import { Step1 } from './Step1'
import { Step2 } from './Step2'

type Props = { initialMobile: string | null }

export function MobileForm(props: Props) {
  const initialMobile = props.initialMobile ?? ''

  // STATES
  const [secondsToResend, setSecondsToResend] = useState(0)

  const {
    currentValue,
    setCurrentValue,
    inputIsEditable,
    setInputIsEditable,
    inputRef,
    submitButtonRef,
    handleBlur,
    handleKeyDown,
    submittingRef,
  } = useAutoInput({ initialValue: initialMobile })

  // HOOKS
  const updateMobileModal = useModal()

  const useStepsHook = useSteps()
  const { currentStep, resetSteps } = useStepsHook

  // FUNCTIONS
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    submittingRef.current = true

    if (isDisabled) return
    updateMobileModal.open()
  }

  function handleCloseModal() {
    // console.log('AAA')
    resetSteps()

    setTimeout(() => {
      // console.log('focus')
      inputRef.current?.focus()
      submittingRef.current = false
    }, 100)
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
          innerRef={inputRef}
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

      <Modal modal={updateMobileModal} onExitComplete={handleCloseModal}>
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
