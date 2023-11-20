import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect, useRef } from 'react'

interface Props extends React.PropsWithChildren {
  modal: UseModal
  preventClose?: boolean
  onExitComplete?(): void
}

export function Modal(props: Props) {
  const { modal, children, preventClose, onExitComplete } = props
  const { isOpen, close } = modal

  const onClose = preventClose ? () => {} : close

  return (
    <Transition appear show={isOpen} as={Fragment}>
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
          {/* bg-black/25 */}
          <div className='fixed inset-0 z-50 bg-black/25' />
        </Transition.Child>

        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Dialog.Panel className='max-h-full overflow-y-auto rounded-2xl bg-white p-6 shadow-xl'>
              <Child onExitComplete={onExitComplete}>{children}</Child>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

function Child(props: React.PropsWithChildren<{ onExitComplete?(): void }>) {
  const { onExitComplete } = props

  const firstRender = useRef(true)

  useEffect(() => {
    return () => {
      if (firstRender.current) {
        firstRender.current = false
      } else {
        onExitComplete?.()
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
  //   // Code to run only on the first render
  //   firstRender.current = false
  // }, []) // Empty dependency array for the first render only

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
