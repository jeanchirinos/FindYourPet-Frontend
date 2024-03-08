export type SetState<T> = React.Dispatch<React.SetStateAction<T>>

export type PageProps<Params = {}, SearchParams = {}> = {
  params: Record<Params, string>
  searchParams: Record<SearchParams, string | undefined>
}

export type PageSearchParamsProps<SearchParams> = {
  searchParams: Record<SearchParams, string | undefined>
}

export type PageSearchParamsProps2<SearchParams2> = {
  searchParams: SearchParams2
}

export type SearchParamsProps<SearchParams> = Partial<Record<SearchParams, string>>
