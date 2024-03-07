const ROOT = {
  PETS: '/',
  HOME: '/inicio',
  PUBLISH: '/publicar',
  POSTS: '/publicaciones',
  SETTINGS: '/ajustes',
} as const

const ADMIN = {
  POSTS: '/administrar/publicaciones',
} as const

const PETS = {
  ID: (id: string | number) => `/mascotas/${id}` as const,
} as const

const AUTH = {
  PASSWORD_FORGOT: '/recuperar',
  PASSWORD_RESET: '/recuperar_api',
  SOCIAL_AUTH: '/social_auth',
} as const

export const ROUTE = {
  ...ROOT,
  AUTH,
  PETS,
  ADMIN,
}
