import { actionRequestGet } from '@/utilities/actionRequest'

export default function Page() {
  return (
    <>
      <Component1 />
      <Component2 />
    </>
  )
}

async function Component1() {
  const data = await actionRequestGet('pet/10', {
    cache: 'no-store',
  })

  console.log({ data })

  return <>1</>
}

async function Component2() {
  const data = await actionRequestGet('pet/10', { cache: 'no-store' })

  console.log({ data })

  return <>2</>
}
