// import { TId } from '@/src/types/types'
// import { EPortfolioType } from './enums'

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
  PASSWORD_RESET: '/recuperar',
  PASSWORD_RESET_CONFIRM: '/recuperar_api',
  FORGOT: '/olvide-contrasena',
  RESET: '/restablecer-contrasena',
} as const

// const INSTRUMENTOS = {
//   INDEX: '/instrumentos',
//   ID: (id: TId, type: string) => `/instrumentos/${type}/${id}` as const,
// } as const

// const PORTAFOLIO = {
//   INDEX: '/portafolio',
//   TYPE: (type: keyof typeof EPortfolioType) => `/portafolio?type=${type}` as const,
// } as const

// const EMPRESA = {
//   ID: (id: TId) => `/empresa/${id}` as const,
// } as const

// const PROYECTO = {
//   ID: (id: TId) => `/proyecto/${id}` as const,
// } as const

// const BUSCAR = {
//   INDEX: '/buscar',
//   PARAM: (q: string) => `/buscar?q=${q}` as const,
// } as const

// const ANALYTICS = {
//   INDEX: '/analytics',
//   NOTICIAS: (type: 'sector_inmobiliario' | 'economia' | 'politica' = 'economia') =>
//     `/analytics/noticias/${type}` as const,
//   INDICADORES: (category?: 'economico' | 'demografico' | 'bienes_raices') =>
//     `/analytics/indicadores${category ? `#${category}` : ''}` as const,
//   ACADEMICS: (category?: 'informes' | 'articulos' | 'investigaciones') =>
//     `/analytics/academics${category ? `#${category}` : ''}` as const,
//   APP: 'https://www.onbpi.com/assessment/analytics/',
// } as const

export const ROUTE = {
  ...ROOT,
  // INSTRUMENTOS,
  // PORTAFOLIO,
  // EMPRESA,
  // PROYECTO,
  // BUSCAR,
  // ANALYTICS,
}
