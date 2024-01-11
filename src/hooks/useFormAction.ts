'use client'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { useFormState } from 'react-dom'

export type Options = {
  onSuccess?: () => void
  showSuccessToast?: boolean
  onError?: () => void
  showErrorToast?: boolean
}

export function useFormAction(action: any, options?: Options) {
  const { onSuccess, showSuccessToast = true, onError, showErrorToast = true } = options ?? {}

  const initialState = { ok: null, msg: '' } as { ok: boolean | null; msg: string }

  const [state, formAction] = useFormState(action, initialState)

  useEffect(() => {
    const { ok, msg } = state

    if (ok === null) return

    if (ok) {
      onSuccess?.()

      if (showSuccessToast) {
        toast.success(msg)
      }
    } else {
      onError?.()

      if (showErrorToast) {
        toast.error(msg)
      }
    }
  }, [state, onSuccess, onError, showSuccessToast, showErrorToast])

  return { state, formAction }
}
