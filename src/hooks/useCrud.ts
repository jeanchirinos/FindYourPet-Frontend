import { SWRKey } from '@/enums'
import { useSendData } from './useSendData'
import { Params, SWRWaitFor, useGetData } from './useGetData'

type UseList = {
  swrKey: SWRKey
  listUrl: string
  waitFor?: SWRWaitFor
}

export function useList<T>(params: UseList) {
  const { swrKey, listUrl, waitFor } = params

  const { data, ...rest } = useGetData<T>(listUrl, {
    key: swrKey,
    waitFor,
  })

  return {
    data,
    ...rest,
  }
}

type UseUpsert = {
  key: SWRKey
  url: string
  arg: object
}

export function useUpsert(params: UseUpsert) {
  const { key, url, arg } = params

  const { trigger, isMutating } = useSendData(url, {
    key,
  })

  function handleUpsert({ onSuccess }: { onSuccess?: () => void }) {
    trigger(arg, {
      onSuccess,
      populateCache: false,
    })
  }

  return { handleUpsert, isMutating }
}

type UseDelete = {
  id: number
  key: SWRKey
  url: string
}

export function useDelete(params: UseDelete) {
  const { id, key, url } = params

  const { trigger } = useSendData<{ id: number }>(url, {
    key,
  })

  function handleDelete() {
    trigger({ id }, { populateCache: false })
  }

  return { handleDelete }
}
