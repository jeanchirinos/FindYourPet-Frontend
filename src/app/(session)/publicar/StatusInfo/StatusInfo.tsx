import { getStatusList } from '@/controllers/Pet'
import { StatusInfoClient } from './StatusInfoClient'

export async function StatusInfo() {
  const statusList = await getStatusList()

  return <StatusInfoClient statusList={statusList} />
}
