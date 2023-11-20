'use client'
// import { useEffect, useState, useTransition } from 'react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useFormState } from 'react-dom'
// import { sendData } from '@/utilities/actionRequest'
// import { waitFor } from '@/utilities/utilities'
// import { updateValue } from '@/controllers/User'

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

// type Options2<S, E> = {
//   onSuccess?: (data: S) => void
//   showSuccessToast?: boolean
//   onError?: (data: E) => void
//   showErrorToast?: boolean
// }

// export function useFormAction2<S, E>(options?: Options2<S, E>) {
// export function useFormAction2<S, E>() {
//   // const [isLoading, setIsLoading] = useState(false)
//   const [isPending, baseStartTransition] = useTransition()
//   const [res, setRes] = useState<{ ok: boolean; msg: string; data: S | E } | null>(null)

//   // const initialState = { ok: null, msg: '' } as { ok: boolean | null; msg: string }

//   // const [state, formAction] = useFormState(action, initialState)

//   // useEffect(() => {
//   //   const { ok, msg } = state

//   //   if (ok === null) return

//   //   setIsLoading(prev => (prev ? false : prev))
//   // }, [state])

//   // return { state, formAction, isLoading }

//   // useEffect(() => {
//   //   setIsLoading(prev => {
//   //     if (prev === null && !isPending) return prev

//   //     return isPending
//   //   })
//   // }, [isPending])

//   // useEffect(() => {
//   //   if (isLoading === null || isLoading) return

//   //   console.log('Finished')
//   // }, [isLoading])

//   // useEffect(() => {
//   //   if(!res) return

//   //   const { ok, msg, data } = res

//   //   if (ok) {
//   //     onSuccess?.(data as S)

//   //     if (showSuccessToast) {
//   //       toast.success(msg)
//   //     }
//   //   } else {
//   //     onError?.(data as E)

//   //     if (showErrorToast) {
//   //       toast.error(msg)
//   //     }
//   //   }
//   // }, [res])

//   function startTransition(action: any, options?: Options2<S, E>) {
//     // const { onSuccess, showSuccessToast = true, onError, showErrorToast = true } = options ?? {}

//     // let res = null

//     baseStartTransition(async () => {
//       const res = (await action()) as { ok: boolean; msg: string; data: S | E }

//       setRes(res)
//     })
//   }

//   return { startTransition, isPending, res }
// }

// async function serverAction({ data, schema }: { data: any; schema: any }) {
//   'use server'

//   sendData({
//     url: 'pet-store',
//     schema,
//     body: data,
//     revalidate: true,
//     auth: false,
//   })
// }
