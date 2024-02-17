import { getStatusList } from '@/controllers/Pet'
import { LinkSearchParams } from '@/components/LinkSearchParams'
import { twJoin } from 'tailwind-merge'

export async function FilterStatus(props: { status: string }) {
  const statusList = await getStatusList()

  const classNames = {
    1: 'bg-search',
    2: 'bg-lost',
    3: 'bg-adopt',
  }

  return (
    <section>
      <p className='font-semibold text-foreground-900'>Estado</p>

      <div className='flex flex-col gap-y-2'>
        {statusList.map(item => (
          <LinkSearchParams
            key={item.id}
            currentParam={props.status}
            searchParamKey='status'
            searchParamValue={item.id}
            keysToDelete={['page']}
            classNames={{
              selected: twJoin(classNames[item.id as keyof typeof classNames], 'text-white'),
              notSelected: 'bg-transparent hover:bg-foreground-100',
            }}
            className='flex w-full min-w-max cursor-pointer items-center justify-start rounded-lg p-2.5 text-sm shadow-md'
          >
            {item.value}
          </LinkSearchParams>
        ))}
      </div>
    </section>
  )
}
