import { getStatusList } from '@/controllers/PetController/getStatusList'
import { RadioItem } from '@/components/RadioItem'
import { cn } from '@nextui-org/react'

const checkedClassNames = {
  1: 'has-[:checked]:bg-search',
  2: 'has-[:checked]:bg-lost',
  3: 'has-[:checked]:bg-adopt',
}

type Props = { initialStatusId: string | number | undefined }

export async function StatusInfo(props: Props) {
  const statusList = await getStatusList()

  const defaultStatusId = props.initialStatusId?.toString() ?? statusList[0].id.toString()

  return (
    <fieldset className='flex gap-2 max-sm:flex-col'>
      {statusList.map(status => (
        <RadioItem
          key={status.id}
          input={{
            name: 'status',
            value: status.id,
            defaultChecked: status.id.toString() === defaultStatusId,
          }}
          className={cn('grow has-[:checked]:text-white', checkedClassNames[status.id])}
          variant='bordered'
        >
          {status.value}
        </RadioItem>
      ))}
    </fieldset>
  )
}
