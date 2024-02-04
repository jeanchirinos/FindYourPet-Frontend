import { getStatusList } from '@/controllers/Pet'
import { FilterStatusClient } from './FilterStatusClient'

export async function FilterStatus(props: { status: string }) {
  const statusList = await getStatusList()

  return (
    <section>
      <p className='font-semibold text-foreground-900'>Estado</p>
      <FilterStatusClient statusList={statusList} status={props.status} />
    </section>
  )
}
