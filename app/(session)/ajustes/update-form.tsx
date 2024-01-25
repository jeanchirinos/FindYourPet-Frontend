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
import { User } from '@/models/User'

export function UpdateForm(props: { user: User }) {
  const { user } = props

  return (
    <>
      <ProfileImage user={user} />

      <ParamForm initialValue={user.name} label='Nombre' paramName='name' />
      <ParamForm initialValue={user.username} label='Usuario' paramName='username' />
      <MobileForm initialMobile={user.mobile} />
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
      <section className='relative mb-5 size-[250px] max-w-full'>
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
            className='size-[2rem] opacity-0'
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
  initialValue: string | null
  paramName: string
  label: string
  children?: React.ReactNode
}) {
  const initialValue = props.initialValue ?? ''

  // FUNCTIONS
  async function handleAction(formData: FormData) {
    const { paramName } = props

    const value = formData.get(paramName) as string

    const res = await updateValue({ param: paramName, value })

    handleResponse(res, {
      showSuccessToast: true,
    })
  }

  // RENDER
  return (
    <form action={handleAction} className='group mt-4 flex items-center gap-x-2'>
      <FormBody {...props} initialValue={initialValue} />
    </form>
  )
}

type TFormBodyProps = {
  initialValue: string
  label: string
  paramName: string
  children?: React.ReactNode
}

function FormBody(props: TFormBodyProps) {
  const { initialValue, label, paramName } = props

  // HOOKS
  const {
    currentValue,
    setCurrentValue,
    inputIsEditable,
    setInputIsEditable,
    inputRef,
    submitButtonRef,
    handleBlur,
    isDisabled,
    pending,
    handleKeyDown,
  } = useAutoInput({ initialValue })

  // RENDER
  return (
    <>
      <Input
        type='text'
        innerRef={inputRef}
        disabled={pending}
        name={paramName}
        label={label}
        value={currentValue}
        onChange={e => setCurrentValue(e.target.value)}
        onFocus={() => setInputIsEditable(true)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />

      {inputIsEditable && (
        <SubmitButton
          size='sm'
          isDisabled={isDisabled}
          disabled={isDisabled}
          innerRef={submitButtonRef}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
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

  // HOOKS
  const { pending } = useFormStatus()

  // STATES
  const [currentValue, setCurrentValue] = useState(initialValue)
  const [inputIsEditable, setInputIsEditable] = useState(false)

  // VALUES
  const inputRef = useRef<HTMLInputElement>(null)
  const submitButtonRef = useRef<HTMLButtonElement>(null)
  const submittingRef = useRef(pending)
  const isDisabled = initialValue === currentValue || pending

  // EFFECTS
  useEffect(() => {
    submittingRef.current = pending

    if (!pending) {
      setInputIsEditable(false)
      setCurrentValue(initialValue)
    }
  }, [pending, initialValue])

  useEffect(() => {
    setCurrentValue(initialValue)
  }, [initialValue])

  // FUNCTIONS
  function handleBlur() {
    setTimeout(() => {
      if (submittingRef.current) return
      if (document.activeElement === submitButtonRef.current) return

      setInputIsEditable(false)
      setCurrentValue(initialValue)
    }, 100)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      setInputIsEditable(false)
      setCurrentValue(initialValue)
      inputRef.current?.blur()
    }
  }

  return {
    currentValue,
    setCurrentValue,
    inputIsEditable,
    setInputIsEditable,
    inputRef,
    submitButtonRef,
    handleBlur,
    handleKeyDown,
    isDisabled,
    pending,
  }
}
