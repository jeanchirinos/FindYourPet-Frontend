import toast from 'react-hot-toast'

// type MySuccessRes = { status: 'success'; msg: string }
// type MyErrorRes = { status: 'error'; msg: string }

type MySuccessRes = { ok: true; msg: string | undefined }
type MyErrorRes = { ok: false; msg: string }

type MyResponse = MySuccessRes | MyErrorRes

type ActionParams<SuccessRes = {}, ErrorRes = {}> = {
  onSuccess?: (data: SuccessRes & MySuccessRes) => void
  onError?: (data: ErrorRes & MyErrorRes) => void
  showSuccessToast?: boolean
  showErrorToast?: boolean
}

export function manageActionResponse<S = {}, E = {}>(
  res: MyResponse,
  manageParams?: ActionParams<S, E>,
) {
  const { onSuccess, onError, showSuccessToast = false, showErrorToast = true } = manageParams ?? {}

  if (res.ok) {
    onSuccess?.(res as S & MySuccessRes)

    if (showSuccessToast) {
      toast.success(res.msg ?? '')
    }
  }

  if (!res.ok) {
    onError?.(res as E & MyErrorRes)

    if (showErrorToast) {
      toast.error(res.msg)
    }
  }

  return res
}
