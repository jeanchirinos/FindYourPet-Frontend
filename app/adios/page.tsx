import { Suspense } from 'react'
import ExampleClientComponent from './example-client-component'

export default function Page() {
  return (
    <>
      <Suspense>
        <ExampleClientComponent />
      </Suspense>
    </>
  )
}
