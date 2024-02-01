import Link from 'next/link'

export default function Page() {
  return (
    <div className='m-10 flex gap-x-5 *:border *:border-neutral-500 *:p-10 active:*:bg-red-500'>
      <Link href='?status=1'>1</Link>
      <Link href='?status=2'>2</Link>
      <Link href='?status=3'>3</Link>
    </div>
  )
}
