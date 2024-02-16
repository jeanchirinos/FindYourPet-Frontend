import { getStatusList } from '@/controllers/Pet'
import { RadioGroup, RadioLabel, RadioOption } from '@/components/RadioGroup'
import { twJoin } from 'tailwind-merge'

export async function StatusInfo() {
  const statusList = await getStatusList()

  return (
    <RadioGroup name='status' defaultValue={statusList[0]?.id.toString()}>
      <div className='flex gap-2 max-sm:flex-col'>
        {statusList.map(item => (
          <RadioOption
            key={item.id}
            value={item.id.toString()}
            className={twJoin(
              'flex w-full cursor-pointer items-center justify-center rounded-lg px-4 py-3 text-sm shadow-md focus:outline-none',
              'ui-checked:bg-orange-100 ui-checked:text-orange-600',
            )}
          >
            <RadioLabel as='p'>{item.value}</RadioLabel>
          </RadioOption>
        ))}
      </div>
    </RadioGroup>
  )
}
