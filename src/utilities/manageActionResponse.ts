import toast from 'react-hot-toast'

type MySuccessRes = { status: 'success'; msg: string }
type MyErrorRes = { status: 'error'; msg: string }

type MyResponse = MySuccessRes | MyErrorRes

type ActionParams<SuccessRes = {}, ErrorRes = {}> = {
  onSuccess?: (data: SuccessRes & MySuccessRes) => void
  onError?: (data: ErrorRes & MyErrorRes) => void
  showSuccessToast?: boolean
  showErrorToast?: boolean
}

export function manageActionResponse<S = {}, E = {}>(
  response: MyResponse,
  manageParams?: ActionParams<S, E>,
) {
  const { onSuccess, onError, showSuccessToast = true, showErrorToast = true } = manageParams ?? {}

  if (response.status === 'success') {
    onSuccess?.(response as S & MySuccessRes)

    if (showSuccessToast) {
      toast.success(response.msg)
    }
  }

  if (response.status === 'error') {
    onError?.(response as E & MyErrorRes)

    if (showErrorToast) {
      toast.error(response.msg)
    }
  }

  return response
}
