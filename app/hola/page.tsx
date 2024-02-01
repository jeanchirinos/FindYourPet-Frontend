import { PageProps } from '@/types'
import Link from 'next/link'
import { Suspense } from 'react'

type Props = PageProps<'', 'status'>

export default function Page(props: Props) {
  return (
    <Suspense fallback='LOADING' key={props.searchParams.status}>
      <div className='flex flex-col gap-y-5'>
        <h1>{props.searchParams.status}</h1>
        <div className='m-10 flex gap-x-5 *:border *:border-neutral-500 *:p-10 active:*:bg-red-500'>
          <Link href='/hola?status=1'>1</Link>
          <Link href='/hola?status=2'>2</Link>
          <Link href='/hola?status=3'>3</Link>
        </div>
      </div>
    </Suspense>
  )
}
