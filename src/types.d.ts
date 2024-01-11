export type SetState<T> = React.Dispatch<React.SetStateAction<T>>

export type PageProps<Params = {}, SearchParams = {}> = {
  params: Record<Params, string>
  searchParams: Record<SearchParams, string | undefined>
}
