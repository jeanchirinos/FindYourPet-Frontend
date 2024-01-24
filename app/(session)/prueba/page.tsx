import { PageProps } from '@/types'
import Link from 'next/link'

type Props = PageProps<'', 'status'>

export default function Page(props: Props) {
  const { searchParams } = props

  console.log(searchParams)

  return (
    <div className='ml-20 *:p-10'>
      <Link href='?status=1'>1</Link>
      <Link href='?status=2'>2</Link>
      <Link href='?status=3'>3</Link>
    </div>
  )
}
