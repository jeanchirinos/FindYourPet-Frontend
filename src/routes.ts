const ROOT = {
  HOME: '/inicio',
  PUBLISH: '/publicar',
  SUCCESS_STORIES: '/casos_de_exito',
  SETTINGS: '/ajustes',
} as const

const ADMIN = {
  POSTS: '/administrar/publicaciones',
} as const

const PETS = {
  INDEX: '/',
  ID: (id: string | number) => `/mascotas/${id}` as const,
} as const

const POSTS = {
  INDEX: '/publicaciones',
  EDIT: (id: string | number) => `/publicaciones/editar/${id}` as const,
}

const AUTH = {
  PASSWORD_FORGOT: (email?: string) => `/recuperar${email ? '?email=' + email : ''}` as const,
  // API use this two routes
  PASSWORD_RESET: '/recuperar_api',
  SOCIAL_AUTH: '/social_auth',
} as const

export const ROUTE = {
  ...ROOT,
  AUTH,
  PETS,
  ADMIN,
  POSTS,
}
