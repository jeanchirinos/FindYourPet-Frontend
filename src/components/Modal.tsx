import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

interface Props extends React.PropsWithChildren {
  modal: UseModal
}

export function Modal(props: Props) {
  const { modal, children } = props
  const { isOpen, close } = modal

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={() => close()}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 z-50 bg-black/25' />
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
            <Dialog.Panel className='max-h-full overflow-y-auto rounded-2xl bg-custom1 p-6 shadow-xl'>
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

// HOOK
export function useModal({ onClose }: { onClose?: () => void } = {}) {
  const [isOpen, setIsOpen] = useState(false)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
    onClose?.()
  }

  return { isOpen, open, close }
}

export type UseModal = ReturnType<typeof useModal>
