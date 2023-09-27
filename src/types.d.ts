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
