import { request } from '@/utilities/request'

export default async function Page() {
  const data = await request('category')

  return (
    <pre>
      {JSON.stringify(data, null, 2)}
      {/* <h1>Hola</h1> */}
    </pre>
  )
}
