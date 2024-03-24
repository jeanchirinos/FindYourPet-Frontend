import { updateImageProfile } from '@/controllers/UserController/updateImageProfile'
import { useRef, useState } from 'react'
import { CropperRef, Cropper, CircleStencil } from 'react-advanced-cropper'
import 'react-advanced-cropper/dist/style.css'
import { SubmitButton } from '@/components/SubmitButton'
import { Modal, useModal } from '@/components/Modal'
import { User } from '@/models/User'
import { handleResponse } from '@/utilities/handleResponse'
import { Button } from '@nextui-org/button'
import { Image } from '@/components/Image'
import { IconCamera } from '@/icons'

type Props = { user: User }

export function ProfileImage(props: Props) {
  const { user } = props

  // HOOKS
  const profileImageModal = useModal()

  // REF
  const cropperRef = useRef<CropperRef>(null)

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

    const res = await updateImageProfile(formData)

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
        <Button
          as='label'
          role={null as any}
          isIconOnly
          radius='full'
          color='primary'
          className='absolute bottom-5 right-5 cursor-pointer text-2xl'
        >
          <IconCamera />
          <input hidden type='file' accept='image/*' onChange={handleInputImage} />
        </Button>
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
