import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import { Suspense as ReactSuspense, Key } from 'react'
import { ErrorUiComponent } from './ComponentError'

type Props = React.ComponentProps<typeof ReactSuspense> & { keyProp?: Key }

export function Suspense(props: Props) {
  const { keyProp, ...restProps } = props

  return (
    <ErrorBoundary errorComponent={ErrorUiComponent} key={keyProp}>
      <ReactSuspense {...restProps} />
    </ErrorBoundary>
  )
}
