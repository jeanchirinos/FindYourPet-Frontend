'use client'
import { Input } from '@/components/Input'
import { useState } from 'react'

import { Modal, UseModal, useModal } from '@/components/Modal'
import { Button } from '@nextui-org/button'
import { useSteps } from '@/hooks/useSteps'
import { useAutoInput } from '../data-form/useAutoInput'
import { Step1 } from './Step1'
import { Step2 } from './Step2'
import { IconDelete } from '@/icons'
import { deleteMobile } from '@/controllers/UserController/deleteMobile'
import { SubmitButton } from '@/components/SubmitButton'
import { useFormAction } from '@/hooks/useFormAction'

type Props = { initialMobile: string | null }

export function MobileForm(props: Props) {
  const initialMobile = props.initialMobile ?? ''

  // STATES
  const [secondsToResend, setSecondsToResend] = useState(0)

  const {
    currentValue,
    setInputIsEditable,
    inputRef,
    setCurrentValue,
    handleBlur,
    submitButtonRef,
    inputIsEditable,
    submittingRef,
    handleKeyDown,
  } = useAutoInput({ initialValue: initialMobile })

  // HOOKS
  const updateMobileModal = useModal()
  const deleteMobileModal = useModal()

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
    resetSteps()

    setTimeout(() => {
      inputRef.current?.focus()
      submittingRef.current = false
    }, 250)
  }

  // ACTION
  function handleSubmitDelete(e: React.FormEvent) {
    e.preventDefault()

    submittingRef.current = true

    deleteMobileModal.open()
  }

  // VALUES
  const isDisabled = initialMobile === currentValue || !/^9[0-9]{8}$/.test(currentValue)

  // RENDER
  return (
    <>
      <div className='mt-4 flex items-end gap-x-2'>
        <form
          onSubmit={handleSubmit}
          className='flex grow items-end gap-x-2'
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
            <Button
              size='sm'
              isDisabled={isDisabled}
              disabled={isDisabled}
              color='primary'
              type='submit'
              ref={submitButtonRef}
            >
              Guardar
            </Button>
          )}
        </form>

        {inputIsEditable && initialMobile !== '' && (
          <form onSubmit={handleSubmitDelete}>
            <SubmitButton
              size='sm'
              color='danger'
              variant='flat'
              isIconOnly
              innerRef={submitButtonRef}
            >
              <IconDelete className='pointer-events-none' />
            </SubmitButton>
          </form>
        )}
      </div>

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
            currentMobile={currentValue}
          />
        )}
      </Modal>

      <DialogDelete
        modal={deleteMobileModal}
        onExitComplete={() => {
          setTimeout(() => {
            // inputRef.current?.focus()
            // submittingRef.current = false
            inputRef.current?.focus()
            inputRef.current?.blur()
            submittingRef.current = false
          }, 250)
        }}
      />
    </>
  )
}

function DialogDelete(props: { modal: UseModal; onExitComplete: () => void }) {
  const { modal, onExitComplete } = props

  const { formAction } = useFormAction(deleteMobile, {
    onSuccess: modal.close,
  })

  return (
    <Modal modal={modal} onExitComplete={onExitComplete}>
      <form action={formAction} className='space-y-4'>
        <span>¿ Estás seguro de remover tu número de contacto ?</span>

        <footer className='flex justify-center gap-x-2'>
          <Button onClick={modal.close}>No, cancelar</Button>
          <SubmitButton color='danger'>Sí, remover</SubmitButton>
        </footer>
      </form>
    </Modal>
  )
}
