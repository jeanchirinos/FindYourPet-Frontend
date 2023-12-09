export type SetState<T> = React.Dispatch<React.SetStateAction<T>>

export type PageProps<Params = {}, SearchParams = {}> = {
  params: Params
  searchParams: Partial<SearchParams>
}
