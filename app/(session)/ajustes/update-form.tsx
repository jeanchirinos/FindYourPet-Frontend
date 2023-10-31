'use client'
import { updateUserImageProfile, updateValue } from '@/serverActions/profile'
import { Input } from '@/components/Input'
import { User } from '../perfil/[id]/page'
import { BiSolidCamera } from 'react-icons/bi'
import { useRef, useState, useEffect } from 'react'
import { CropperRef, Cropper, CircleStencil } from 'react-advanced-cropper'
import 'react-advanced-cropper/dist/style.css'
import Image from 'next/image'
import { SubmitButton } from '@/components/SubmitButton'
import { Modal, useModal } from '@/components/Modal'
import { manageActionResponse } from '@/utilities/manageActionResponse'
import { MobileForm } from './update-mobile'
import { useFormStatus } from 'react-dom'
import { SetState } from '@/types'

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
    // if(file.size > 1024 * 1024 * 2) return

    setImagePreview(imagePreview)
    profileImageModal.open()
  }

  async function formAction(formData: FormData) {
    const image = cropperRef.current?.getCanvas()?.toDataURL()!

    formData.set('image', image)

    const res = await updateUserImageProfile(formData)

    manageActionResponse(res, {
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

function ParamForm(props: { initialValue: string; paramName: string; label: string }) {
  const { initialValue = '', paramName, label } = props

  // STATES
  const [currentValue, setCurrentValue] = useState(initialValue)
  const [inputIsEditable, setInputIsEditable] = useState(false)

  // FUNCTIONS
  async function handleAction(formData: FormData) {
    if (isDisabled) return

    const value = formData.get(paramName) as string

    const res = await updateValue({ param: paramName, value })

    manageActionResponse(res, {
      showSuccessToast: true,
      onSuccess() {
        setInputIsEditable(false)
      },
    })
  }

  // VALUES
  const isDisabled = initialValue === currentValue

  // RENDER
  return (
    <form
      action={handleAction}
      className='group mt-4 flex items-center gap-x-2'
      onKeyDown={e => {
        if (e.key === 'Escape') {
          setInputIsEditable(false)
          setCurrentValue(initialValue)
        }
      }}
    >
      <FormBody
        initialValue={initialValue}
        label={label}
        currentValue={currentValue}
        inputIsEditable={inputIsEditable}
        paramName={paramName}
        setCurrentValue={setCurrentValue}
        setInputIsEditable={setInputIsEditable}
      />
    </form>
  )
}

function FormBody(props: {
  initialValue: string
  label: string
  inputIsEditable: boolean
  setInputIsEditable: SetState<boolean>
  paramName: string
  currentValue: string
  setCurrentValue: SetState<string>
}) {
  const { pending } = useFormStatus()

  const {
    initialValue = '',
    label,
    inputIsEditable,
    setInputIsEditable,
    currentValue,
    paramName,
    setCurrentValue,
  } = props

  // VALUES
  const isDisabled = initialValue === currentValue
  const inputRef = useRef<HTMLInputElement>(null)
  const submitButtonRef = useRef<HTMLButtonElement>(null)
  const submittingRef = useRef(pending)

  useEffect(() => {
    submittingRef.current = pending
  }, [pending])

  // RENDER
  return (
    <>
      <Input
        type='text'
        name={paramName}
        label={label}
        value={currentValue}
        onChange={e => setCurrentValue(e.target.value)}
        readOnly={!inputIsEditable}
        ref={inputRef}
        onFocus={() => setInputIsEditable(true)}
        onBlur={() => {
          setTimeout(() => {
            if (document.activeElement === submitButtonRef.current) return
            if (submittingRef.current) return

            setInputIsEditable(false)
            setCurrentValue(initialValue)
          }, 1)
        }}
      />

      {inputIsEditable && (
        <SubmitButton
          size='sm'
          isDisabled={isDisabled}
          disabled={isDisabled}
          ref={submitButtonRef}
        />
      )}
    </>
  )
}
