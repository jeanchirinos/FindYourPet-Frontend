export type UserLogged = {
  status: 'success'
  auth: true
  image: string
  role: ERole
}

export type User = UserLogged | { status: 'success'; auth: false }
