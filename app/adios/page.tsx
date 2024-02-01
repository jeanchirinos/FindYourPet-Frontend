import { Suspense } from 'react'
import ExampleClientComponent from './example-client-component'
import { PageProps } from '@/types'

type Props = PageProps<'', 'sort'>

export default function Page(props: Props) {
  const { sort } = props.searchParams

  console.log(sort)

  return (
    <>
      <p key={sort + 'ago'}>{props.searchParams.sort}</p>
      <Suspense key={sort}>
        <ExampleClientComponent />
      </Suspense>
    </>
  )
}
