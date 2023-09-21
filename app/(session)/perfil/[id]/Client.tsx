'use client'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import Image from 'next/image'
import { BiSolidCamera } from 'react-icons/bi'
import { HiOutlineMail, HiOutlineDeviceMobile } from 'react-icons/hi'
import { Suspense, useRef, useState } from 'react'

import { CropperRef, Cropper, CircleStencil } from 'react-advanced-cropper'
import 'react-advanced-cropper/dist/style.css'
import { User } from './page'
import { SetState } from '@/types'
import { useUpdateImage, useUpdateUser } from '@/services/user'
import { useRouter, useParams } from 'next/navigation'

export function Client(props: { user: User }) {
  // HOOKS
  const { user } = props
  const params = useParams()
  const router = useRouter()

  const { email, image, isUser, mobile, name, username } = user

  const { trigger: triggerUpdateImage } = useUpdateImage(username)

  // REF
  const cropperRef = useRef<CropperRef>(null)

  // STATES
  const [isEditable, setIsEditable] = useState(false)
  const [isImageEditable, setIsImageEditable] = useState(false)
  const [imagePreview, setImagePreview] = useState('')

  // FUNCTIONS
  function handleInputImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return

    const file = e.target.files[0]

    if (file) {
      setIsImageEditable(true)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  function submitUpdateImage(e: React.FormEvent) {
    e.preventDefault()

    const canvasUrl = cropperRef.current?.getCanvas()?.toDataURL()
    if (!canvasUrl) return

    const formData = new FormData()

    formData.append('image', canvasUrl)

    triggerUpdateImage(formData, {
      onSuccess(data) {
        setIsImageEditable(false)
        router.refresh()
      },
      revalidate: false,
    })
  }

  // RENDER
  return (
    <div className='mx-auto w-[400px] max-w-full space-y-3'>
      <section className='relative mx-auto aspect-square w-[250px] max-w-full'>
        {isImageEditable ? (
          <form className='flex flex-col gap-y-2' onSubmit={submitUpdateImage}>
            <Cropper
              src={imagePreview}
              className='cropper'
              stencilComponent={CircleStencil}
              ref={cropperRef}
            />
            <footer className='flex gap-x-2 child:flex-grow'>
              <Button onPress={() => setIsImageEditable(false)}>Cancelar</Button>
              <Button type='submit' className='bg-primary text-white'>
                Guardar
              </Button>
            </footer>
          </form>
        ) : (
          <>
            <img
              className='rounded-full object-cover'
              src={image}
              width={300}
              height={300}
              alt='Perfil'
            />

            {isUser && (
              <label className='absolute bottom-5 right-5'>
                <div className='pointer-events-none absolute rounded-full bg-pink-500 p-1 text-2xl text-white'>
                  <BiSolidCamera />
                </div>
                <input
                  type='file'
                  className='aspect-square w-[2rem] opacity-0'
                  accept='image/*'
                  onChange={handleInputImage}
                />
              </label>
            )}
          </>
        )}
      </section>
      {!isEditable && (
        <section className='flex flex-col gap-3'>
          <div>
            <div className='text-center'>
              <h1 className='text-2xl font-bold leading-none'>{name}</h1>
              <span>{params.id}</span>
            </div>
            <div className='flex items-center gap-1'>
              <HiOutlineMail />
              <span>Correo: {email}</span>
            </div>
            <div className='flex items-center gap-1'>
              <HiOutlineDeviceMobile />
              <span>Celular: {mobile}</span>
            </div>
          </div>
          {isUser && (
            <Button className='bg-primary text-white' onPress={() => setIsEditable(true)}>
              Editar
            </Button>
          )}
        </section>
      )}

      {isEditable && <EditableForm user={user} setIsEditable={setIsEditable} />}
    </div>
  )
}

type EditableFormProps = { user: User | undefined; setIsEditable: SetState<boolean> }

function EditableForm(props: EditableFormProps) {
  const { user, setIsEditable } = props

  // HOOKS
  const { trigger, isMutating } = useUpdateUser(user!.username)
  const [editableUser, setEditableUser] = useState<Partial<User> | undefined>(user)

  const router = useRouter()

  // FUNCTIONS
  function handleCancel() {
    setIsEditable(false)
  }

  const keys: (keyof User)[] = ['name', 'username', 'mobile']
  const hasNotEdited = keys.every(key => editableUser?.[key] === user?.[key])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (hasNotEdited) return

    trigger(editableUser!, {
      onSuccess() {
        setIsEditable(false)

        if (editableUser?.username !== user?.username) {
          router.replace(`/perfil/${editableUser?.username}`)
        } else {
          router.refresh()
        }
      },
      revalidate: false,
    })
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    setEditableUser(prev => ({ ...prev, [name]: value }))
  }

  // RENDER
  return (
    <section>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
        <Input
          type='text'
          label='Nombre'
          isRequired={false}
          value={editableUser?.name}
          name='name'
          onChange={handleChange}
        />
        <Input
          type='text'
          label='Usuario'
          value={editableUser?.username}
          name='username'
          onChange={handleChange}
        />
        {/* <Input type="text" label="Correo" isRequired={false}/> */}
        <Input
          type='text'
          label='Móvil'
          isRequired={false}
          value={editableUser?.mobile}
          name='mobile'
          onChange={handleChange}
        />
        <div className='flex w-full gap-2 child:w-1/2'>
          <Button type='button' onPress={handleCancel}>
            Cancelar
          </Button>
          <Button
            type='submit'
            className='bg-primary text-white disabled:bg-gray-500'
            safeIsLoading={isMutating}
            disabled={hasNotEdited}
          >
            Guardar
          </Button>
        </div>
      </form>
    </section>
  )
}
