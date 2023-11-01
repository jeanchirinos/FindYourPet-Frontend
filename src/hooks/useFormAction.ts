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

  const [state, formAction] = useFormState(action, { ok: null, msg: null })

  useEffect(() => {
    const { ok, msg } = state as { ok: boolean; msg: string } | { ok: null; msg: null }
    if (ok !== null) {
      if (!ok || showSuccessToast) {
        const status = ok ? 'success' : 'error'

        toast[status](msg)
      }
      if (ok) {
        onSuccess?.()
      }
      if (!ok) {
        onError?.()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return { state, formAction }
}
