export enum ERole {
  ADMIN = 'admin',
  USER = 'user',
}

export type SessionLogged = {
  auth: true
  image: string
  role: ERole
  username: string
  email: string
  name: string | null
}
