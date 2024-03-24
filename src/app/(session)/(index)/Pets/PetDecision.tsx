'use client'

import { SubmitButton } from '@/components/SubmitButton'
import { updatePetVisibility } from '@/controllers/PetController/updatePetVisibility'
import { useFormAction } from '@/hooks/useFormAction'
import { Pet } from '@/models/Pet'

export function PetDecision(props: { pet: Pet }) {
  const { pet } = props

  const { formAction } = useFormAction(updatePetVisibility)

  return (
    <form action={formAction} className='flex gap-x-1.5 *:grow'>
      <input name='id' defaultValue={pet.id} hidden />
      {/*@ts-ignore */}
      {pet.published === '0' ? (
        <SubmitButton color='success' variant='flat'>
          Aprobar
        </SubmitButton>
      ) : (
        <SubmitButton color='danger' variant='flat'>
          Ocultar
        </SubmitButton>
      )}
    </form>
  )
}
