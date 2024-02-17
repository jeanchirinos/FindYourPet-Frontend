import { getStatusList } from '@/controllers/Pet'
import { RadioGroup, RadioLabel, RadioOption } from '@/components/RadioGroup'
import { twJoin } from 'tailwind-merge'

export async function StatusInfo(props: { status: string | undefined }) {
  const statusList = await getStatusList()

  const defaultValue = props.status ?? statusList[0].id.toString()

  const classNames = {
    1: 'ui-checked:bg-search',
    2: 'ui-checked:bg-lost',
    3: 'ui-checked:bg-adopt',
  }

  return (
    <RadioGroup name='status' defaultValue={defaultValue}>
      <div className='flex gap-2 max-sm:flex-col'>
        {statusList.map(item => (
          <RadioOption
            key={item.id}
            value={item.id.toString()}
            className={twJoin(
              'flex w-full cursor-pointer items-center justify-center rounded-lg px-4 py-3 text-sm shadow-md focus:outline-none ui-checked:text-white',
              classNames[item.id as keyof typeof classNames],
            )}
          >
            <RadioLabel as='p'>{item.value}</RadioLabel>
          </RadioOption>
        ))}
      </div>
    </RadioGroup>
  )
}
