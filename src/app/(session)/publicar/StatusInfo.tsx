import { getStatusList } from '@/controllers/PetController/getStatusList'
import { twMerge } from 'tailwind-merge'
import { RadioItem } from '@/components/RadioItem'

export async function StatusInfo(props: { status: string | number | undefined }) {
  const statusList = await getStatusList()

  const defaultValue = props.status?.toString() ?? statusList[0].id.toString()

  const classNames = {
    1: 'has-[:checked]:bg-search',
    2: 'has-[:checked]:bg-lost',
    3: 'has-[:checked]:bg-adopt',
  }

  return (
    <fieldset className='flex gap-2 max-sm:flex-col'>
      {statusList.map(item => (
        <RadioItem
          key={item.id}
          input={{
            name: 'status',
            value: item.id,
            defaultChecked: item.id.toString() === defaultValue,
          }}
          className={twMerge(
            'grow has-[:checked]:text-white',
            classNames[item.id as keyof typeof classNames],
          )}
          variant='bordered'
        >
          {item.value}
        </RadioItem>
      ))}
    </fieldset>
  )
}
