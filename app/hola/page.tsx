import { PageProps } from '@/types'
import Link from 'next/link'

type Props = PageProps<'', 'status'>

export default function Page(props: Props) {
  const { status } = props.searchParams

  console.log('status', status)

  return (
    <div className='flex flex-col gap-y-5'>
      <h1>{status}</h1>
      <div className='m-10 flex gap-x-5 *:border *:border-neutral-500 *:p-10 active:*:bg-red-500'>
        <Link href='?status=1'>1</Link>
        <Link href='?status=2'>2</Link>
        <Link href='?status=3'>3</Link>
      </div>
    </div>
  )
}
