import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState, useEffect, useRef } from 'react'

interface Props extends React.PropsWithChildren {
  modal: UseModal
  preventCloseOnBackdrop?: boolean
  onExitComplete?(): void
}

export function Modal(props: Props) {
  const { modal, children, preventCloseOnBackdrop: preventClose, onExitComplete } = props
  const { isOpen, close } = modal

  const onClose = preventClose ? () => {} : close

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 z-50 bg-black/50' />
        </Transition.Child>

        <div className='fixed inset-0 z-50 p-4 flex-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Dialog.Panel className='max-h-full overflow-y-auto rounded-2xl bg-custom1 p-6 shadow-small'>
              <Child isOpen={isOpen} onExitComplete={onExitComplete}>
                {children}
              </Child>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

function Child(props: React.PropsWithChildren<{ isOpen: boolean; onExitComplete?: () => void }>) {
  const { isOpen, onExitComplete } = props

  const alreadyExited = useRef(false)

  useEffect(() => {
    if (!isOpen && !alreadyExited.current) {
      onExitComplete?.()
      alreadyExited.current = true
    }
  }, [onExitComplete, isOpen])

  return props.children
}

// HOOK
export function useModal() {
  const [isOpen, setIsOpen] = useState(false)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  return { isOpen, open, close }
}

export type UseModal = ReturnType<typeof useModal>
