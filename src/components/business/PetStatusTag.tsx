import { Pet } from '@/models/Pet'
import { twJoin } from 'tailwind-merge'

type Props = {
  className?: string
  pet: Pet
}

export function PetStatusTag(props: Props) {
  const { pet } = props

  const colors = {
    SE_BUSCA: 'bg-search',
    PERDIDO: 'bg-lost',
    EN_ADOPCIÓN: 'bg-adopt',
  }

  const color = Object.values(colors)[pet.status - 1]

  return (
    <section
      className={twJoin('rounded-lg p-1.5 text-center text-lg font-semibold text-white', color)}
    >
      {pet.status_name}
    </section>
  )
}
