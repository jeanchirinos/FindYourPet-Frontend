import { Button } from '@/components/Button'
import { Pet } from '@/models/Pet'

export async function PetDecision(props: { pet: Pet }) {
  return (
    <div className='flex gap-x-1.5 *:grow'>
      <Button color='danger' variant='flat'>
        Desaprobar
      </Button>
      <Button color='success' variant='flat'>
        Aprobar
      </Button>
    </div>
  )
}
