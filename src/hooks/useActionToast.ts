import { useEffect } from 'react'
import toast from 'react-hot-toast'
//@ts-ignore
import { experimental_useFormState as useFormState } from 'react-dom'

type Options = {
  onSuccess?(): void
  onError?(): void
  showToast?: boolean
}

export function useActionToast(action: any, options?: Options) {
  const { onSuccess, showToast = true } = options ?? {}

  const [state, formAction] = useFormState(action, { status: null, msg: null })

  useEffect(() => {
    const { status, msg } = state as
      | { status: 'success' | 'error'; msg: string }
      | { status: null; msg: null }

    if (status) {
      if (showToast) {
        toast[status](msg)
      }

      if (status === 'success') {
        onSuccess?.()
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return { state, formAction }
}
