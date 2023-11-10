export type SessionLogged = {
  auth: true
  image: string
  role: ERole
  username: string
  email: string
  name: string | null
}

export type Session = SessionLogged | { auth: false }

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>

export interface BreedsDataOld {
  id: number
  name: string
  breeds: {
    id: number
    name: string
    category_id: number
  }[]
}

export type BreedsData = Record<
  string,
  {
    id: number
    name: string
    category_id: number
  }[]
>

export interface Category {
  id: number
  name: string
  image: string
}
