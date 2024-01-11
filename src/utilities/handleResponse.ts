import { toast } from 'sonner'
import { sendData } from './actionRequest'
import { Options } from '@/hooks/useFormAction'

export function handleResponse(res: Awaited<ReturnType<typeof sendData>>, options?: Options) {
  const { onSuccess, showSuccessToast = false, onError, showErrorToast = true } = options ?? {}

  if (res.ok) {
    onSuccess?.()

    if (showSuccessToast) {
      toast.success(res.msg)
    }
  } else {
    onError?.()

    if (showErrorToast) {
      toast.error(res.msg)
    }
  }
}
