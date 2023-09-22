'use client'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { BiSolidCamera } from 'react-icons/bi'
import { HiOutlineMail, HiOutlineDeviceMobile } from 'react-icons/hi'
import { useRef, useState } from 'react'

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
  const [formIsEditable, setFormIsEditable] = useState(false)
  const [imagePreview, setImagePreview] = useState<undefined | string>('')

  // FUNCTIONS
  function handleInputImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return

    const file = e.target.files[0]
    const imagePreview = URL.createObjectURL(file)

    if (file) {
      setImagePreview(imagePreview)
    }
  }

  function submitUpdateImage(e: React.FormEvent) {
    e.preventDefault()

    const canvasUrl = cropperRef.current?.getCanvas()?.toDataURL()
    if (!canvasUrl) return

    const formData = new FormData()

    formData.append('image', canvasUrl)

    triggerUpdateImage(formData, {
      onSuccess() {
        setImagePreview(undefined)
        router.refresh()
      },
      revalidate: false,
    })
  }

  // RENDER
  return (
    <div className='mx-auto w-[400px] max-w-full space-y-3'>
      <section className='relative mx-auto aspect-square w-[250px] max-w-full'>
        {imagePreview ? (
          <form className='flex flex-col gap-y-2' onSubmit={submitUpdateImage}>
            <Cropper
              src={imagePreview}
              className='cropper'
              stencilComponent={CircleStencil}
              ref={cropperRef}
            />
            <footer className='flex gap-x-2 child:flex-grow'>
              <Button onPress={() => setImagePreview(undefined)}>Cancelar</Button>
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
      {!formIsEditable && (
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
            <Button className='bg-primary text-white' onPress={() => setFormIsEditable(true)}>
              Editar
            </Button>
          )}
        </section>
      )}

      {formIsEditable && <EditableForm user={user} setIsEditable={setFormIsEditable} />}
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

  // VALUES
  const keys: (keyof User)[] = ['name', 'username', 'mobile']
  const hasNotEdited = keys.every(key => editableUser?.[key] === user?.[key])

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
