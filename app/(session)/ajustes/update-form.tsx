'use client'
import { updateUserImageProfile, updateValue } from '@/controllers/User'
import { Input } from '@/components/Input'
import { BiSolidCamera } from 'react-icons/bi'
import { useRef, useState, useEffect } from 'react'
import { CropperRef, Cropper, CircleStencil } from 'react-advanced-cropper'
import 'react-advanced-cropper/dist/style.css'
import Image from 'next/image'
import { SubmitButton } from '@/components/SubmitButton'
import { Modal, useModal } from '@/components/Modal'
import { handleResponse } from '@/utilities/handleResponse'
import { MobileForm } from './update-mobile'
import { useFormStatus } from 'react-dom'
import { SetState } from '@/types'
import { User } from '@/models/User'

export function UpdateForm(props: { user: User }) {
  const { user } = props

  return (
    <>
      <ProfileImage user={user} />

      <ParamForm initialValue={user.name ?? ''} label='Nombre' paramName='name' />
      <ParamForm initialValue={user.username} label='Usuario' paramName='username' />
      <MobileForm initialMobile={user.mobile ?? ''} />
    </>
  )
}

function ProfileImage(props: { user: User }) {
  const { user } = props

  // HOOKS
  const profileImageModal = useModal()

  // REF
  const cropperRef = useRef<CropperRef>(null)
  const inputImageRef = useRef<HTMLInputElement>(null)

  // STATES
  const [imagePreview, setImagePreview] = useState<undefined | string>(undefined)

  // FUNCTIONS
  function handleInputImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return

    const file = e.target.files[0]
    const imagePreview = URL.createObjectURL(file)

    if (!file) return
    if (!file.type.includes('image')) return

    setImagePreview(imagePreview)
    profileImageModal.open()
  }

  async function formAction(formData: FormData) {
    const image = cropperRef.current?.getCanvas()?.toDataURL()!

    formData.set('image', image)

    const res = await updateUserImageProfile(formData)

    handleResponse(res, {
      onSuccess() {
        profileImageModal.close()
      },
      showSuccessToast: true,
    })
  }

  // RENDER
  return (
    <>
      <section className='relative mb-5 aspect-square w-[250px] max-w-full'>
        <Image
          className='rounded-full object-cover'
          src={user.image}
          width={300}
          height={300}
          alt='Perfil'
          priority
        />
        <label className='absolute bottom-5 right-5'>
          <div className='pointer-events-none absolute rounded-full bg-pink-500 p-1 text-2xl text-white'>
            <BiSolidCamera />
          </div>
          <input
            ref={inputImageRef}
            type='file'
            className='aspect-square w-[2rem] opacity-0'
            accept='image/*'
            onChange={handleInputImage}
          />
        </label>
      </section>

      <Modal modal={profileImageModal}>
        <form className='flex flex-col gap-y-2' action={formAction}>
          <section className='relative max-h-[70vh] w-[400px] max-w-full overflow-y-auto'>
            <Cropper src={imagePreview} stencilComponent={CircleStencil} ref={cropperRef} />
          </section>
          <SubmitButton />
        </form>
      </Modal>
    </>
  )
}

function ParamForm(props: {
  initialValue: string
  paramName: string
  label: string
  children?: React.ReactNode
}) {
  const { initialValue = '', paramName, label, children } = props

  // HOOKS

  const useAutoInputHook = useAutoInput({ initialValue })

  const {
    currentValue,
    setCurrentValue,
    inputIsEditable,
    setInputIsEditable,
    // inputRef,
    // submitButtonRef,
    // submittingRef,
    // handleBlur,
    handleKeyDown,
    isDisabled,
  } = useAutoInputHook

  // STATES
  // const [currentValue, setCurrentValue] = useState(initialValue)
  // const [inputIsEditable, setInputIsEditable] = useState(false)

  // FUNCTIONS
  async function handleAction(formData: FormData) {
    if (isDisabled) return

    const value = formData.get(paramName) as string

    const res = await updateValue({ param: paramName, value })

    handleResponse(res, {
      showSuccessToast: true,
      onSuccess() {
        setInputIsEditable(false)
      },
    })
  }

  // function handleKeyDown(e: React.KeyboardEvent) {
  //   if (e.key === 'Escape') {
  //     setInputIsEditable(false)
  //     setCurrentValue(initialValue)
  //   }
  // }

  // VALUES
  // const isDisabled = initialValue === currentValue

  // RENDER
  return (
    <form
      action={handleAction}
      className='group mt-4 flex items-center gap-x-2'
      onKeyDown={handleKeyDown}
    >
      <FormBody
        {...useAutoInputHook}
        initialValue={initialValue}
        label={label}
        currentValue={currentValue}
        inputIsEditable={inputIsEditable}
        paramName={paramName}
        setCurrentValue={setCurrentValue}
        setInputIsEditable={setInputIsEditable}
      >
        {children}
      </FormBody>
    </form>
  )
}

type TFormBodyProps = ReturnType<typeof useAutoInput> & {
  initialValue: string
  label: string
  inputIsEditable: boolean
  setInputIsEditable: SetState<boolean>
  paramName: string
  currentValue: string
  setCurrentValue: SetState<string>
  children?: React.ReactNode
}

function FormBody(props: TFormBodyProps) {
  const {
    // initialValue = '',
    label,
    inputIsEditable,
    setInputIsEditable,
    currentValue,
    paramName,
    setCurrentValue,
    handleButtonBlur,
  } = props

  const { inputRef, handleBlur, isDisabled, submitButtonRef } = props

  // RENDER
  return (
    <>
      <Input
        type='text'
        name={paramName}
        label={label}
        value={currentValue}
        onChange={e => setCurrentValue(e.target.value)}
        ref={inputRef}
        onFocus={() => setInputIsEditable(true)}
        onBlur={handleBlur}
      />

      {inputIsEditable && (
        <SubmitButton
          size='sm'
          isDisabled={isDisabled}
          disabled={isDisabled}
          ref={submitButtonRef}
          onBlur={handleButtonBlur}
        />
      )}
    </>
  )
}

type TAutoInputProps = {
  initialValue: string
}

export function useAutoInput(props: TAutoInputProps) {
  const { initialValue = '' } = props

  const { pending } = useFormStatus()

  const [currentValue, setCurrentValue] = useState(initialValue)

  const [inputIsEditable, setInputIsEditable] = useState(false)

  // VALUES
  const isDisabled = initialValue === currentValue
  const inputRef = useRef<HTMLInputElement>(null)
  const submitButtonRef = useRef<HTMLButtonElement>(null)
  const submittingRef = useRef(pending)

  useEffect(() => {
    submittingRef.current = pending
  }, [pending])

  function handleBlur() {
    setTimeout(() => {
      console.log('aa')
      if (document.activeElement === submitButtonRef.current) return
      if (submittingRef.current) return

      setInputIsEditable(false)
      setCurrentValue(initialValue)
    }, 1)
  }

  function handleButtonBlur() {
    setInputIsEditable(false)
    setCurrentValue(initialValue)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      setInputIsEditable(false)
      setCurrentValue(initialValue)
    }
  }

  return {
    currentValue,
    setCurrentValue,
    inputIsEditable,
    setInputIsEditable,
    inputRef,
    submitButtonRef,
    submittingRef,
    handleBlur,
    handleKeyDown,
    isDisabled,
    handleButtonBlur,
  }
}
