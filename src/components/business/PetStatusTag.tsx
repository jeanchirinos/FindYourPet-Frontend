import { Pet } from '@/models/Pet'
import { cn } from '@/lib/utils'

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

  const color = Object.values(colors)[Number(pet.status) - 1]

  return (
    <section className={cn('rounded-lg p-1.5 text-center text-lg font-semibold text-white', color)}>
      {pet.status_name}
    </section>
  )
}
