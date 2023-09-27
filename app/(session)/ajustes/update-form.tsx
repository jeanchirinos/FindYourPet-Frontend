'use client'

import {
  //@ts-ignore
  experimental_useFormState as useFormState,
  experimental_useFormStatus as useFormStatus,
} from 'react-dom'
import { updateUser } from './actions'
import { Input } from '@/components/Input'
import { User } from '../perfil/[id]/page'
import { Button } from '@/components/Button'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

const initialState = {
  status: null,
  msg: null,
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type='submit'
      aria-disabled={pending}
      disabled={pending}
      className='bg-primary text-white disabled:bg-gray-500'
    >
      {pending ? 'Updating' : 'Update'}
    </Button>
  )
}

export function UpdateForm(props: { user: User }) {
  const { user } = props
  const [state, formAction] = useFormState(updateUser, initialState)

  useEffect(() => {
    if (!state.status) return
    // @ts-ignore
    toast[state.status](state.msg)
  }, [state])

  return (
    <>
      <form className='flex max-w-[350px] flex-col gap-3' action={formAction}>
        <Input type='text' label='Nombre' isRequired={false} defaultValue={user.name} name='name' />
        <Input type='text' label='Usuario' defaultValue={user.username} name='username' />
        <Input
          type='text'
          label='Móvil'
          isRequired={false}
          defaultValue={user.mobile}
          name='mobile'
        />

        <SubmitButton />
      </form>
    </>
  )
}
