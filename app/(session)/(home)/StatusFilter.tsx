import { LinkSearchParams } from '@/components/LinkSearchParams'
import { getStatusList } from '@/controllers/Pet'

export async function StatusFilterServer(props: { status: string }) {
  const statusList = await getStatusList()

  return (
    <aside className='max-lg:hidden'>
      <section className='space-y-2'>
        <p>Estado</p>

        <div className='flex flex-col gap-y-2'>
          {statusList.map(item => (
            <LinkSearchParams
              key={item.id}
              href={{ status: item.id, page: 1 }}
              selectedValue={props.status}
              value={item.id}
              className='flex w-full min-w-max cursor-pointer items-center justify-center rounded-lg px-4 py-3 text-sm shadow-md'
              classNames={{
                selected: 'bg-orange-100 text-orange-600',
                notSelected: 'hover:bg-foreground-100',
              }}
            >
              {item.value}
            </LinkSearchParams>
          ))}
        </div>
      </section>
    </aside>
  )
}
