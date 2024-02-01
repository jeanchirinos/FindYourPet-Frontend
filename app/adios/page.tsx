import { Suspense } from 'react'
import ExampleClientComponent from './example-client-component'
import { PageProps } from '@/types'

type Props = PageProps<'', 'sort'>

export default function Page(props: Props) {
  const { sort } = props.searchParams

  console.log(sort)

  return (
    <>
      <p>{props.searchParams.sort}</p>
      <Suspense>
        <ExampleClientComponent />
      </Suspense>
    </>
  )
}
