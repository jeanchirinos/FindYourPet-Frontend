'use client'

import { MobileForm } from '../mobile-form/update-mobile'
import { User } from '@/models/User'
import { ProfileImage } from './ProfileImage'
import { EditableInput } from './EditableInput'

type Props = { user: User }

export function UpdateForm(props: Props) {
  const { user } = props

  return (
    <>
      <ProfileImage user={user} />

      <EditableInput
        initialValue={user.name}
        label='Nombre'
        paramName='name'
        inputProps={{ isRequired: false }}
      />
      <EditableInput initialValue={user.username} label='Usuario' paramName='username' />
      <MobileForm initialMobile={user.mobile} />
    </>
  )
}
