import { getStatusList } from '@/controllers/Pet'
import { LinkSearchParams } from '@/components/LinkSearchParams'

export async function FilterStatus(props: { status: string }) {
  const statusList = await getStatusList()

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
              selected: 'bg-orange-100 text-orange-600',
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
