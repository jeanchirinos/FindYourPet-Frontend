import { Suspense } from '@/components/other/CustomSuspense'
import { PageProps } from '@/types'
import { waitFor } from '@/utilities/utilities'
import Link from 'next/link'

type Props = PageProps<'', 'status'>

export default function Page(props: Props) {
  const { searchParams } = props

  console.log(searchParams)

  return (
    <div className='ml-20'>
      <div className='*:bg-red-500 *:p-10'>
        <Link href='?status=1'>1</Link>
        <Link href='?status=2'>2</Link>
        <Link href='?status=3'>3</Link>
      </div>

      <Suspense keyProp={searchParams.status} fallback='LOADING'>
        <Hola />
      </Suspense>
    </div>
  )
}

async function Hola() {
  await waitFor(3)

  return <h1>Hola</h1>
}
