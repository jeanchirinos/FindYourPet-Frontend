import { getStatusList } from '@/controllers/Pet'
import { twJoin } from 'tailwind-merge'
import { RadioItem } from '@/components/RadioItem'

export async function StatusInfo(props: { status: string | number | undefined }) {
  const statusList = await getStatusList()

  const defaultValue = props.status ?? statusList[0].id

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
            defaultChecked: item.id === defaultValue,
          }}
          className={twJoin(
            'flex w-full cursor-pointer items-center justify-center rounded-lg px-4 py-3 text-sm shadow-md has-[:checked]:text-white',
            classNames[item.id as keyof typeof classNames],
          )}
        >
          {item.value}
        </RadioItem>
      ))}
    </fieldset>
  )
}
