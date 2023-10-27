'use client'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useFormState } from 'react-dom'

type Options = {
  onSuccess?(): void
  onError?(): void
  showSuccessToast?: boolean
}

export function useFormAction(action: any, options?: Options) {
  const { onSuccess, onError, showSuccessToast = true } = options ?? {}

  const [state, formAction] = useFormState(action, { status: null, msg: null })

  useEffect(() => {
    const { status, msg } = state as
      | { status: 'success' | 'error'; msg: string }
      | { status: null; msg: null }

    if (status) {
      if (status === 'error' || showSuccessToast) {
        toast[status](msg)
      }

      if (status === 'success') {
        onSuccess?.()
      }

      if (status === 'error') {
        onError?.()
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return { state, formAction }
}
