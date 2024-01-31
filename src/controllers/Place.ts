'use server'
import { actionRequestGet } from '@/utilities/actionRequest'
// import { cache } from 'react'

// type GithubResponse = { payload: { blob: { rawLines: [string, string] } } }
// export type PlaceLocation = {
//   id_ubigeo: string
//   nombre_ubigeo: string
//   codigo_ubigeo: string
//   etiqueta_ubigeo: string
//   buscador_ubigeo: string
//   numero_hijos_ubigeo: string
//   nivel_ubigeo: '1' | '2' | '3'
//   id_padre_ubigeo: string
// }

// async function getData<T>(type: 'departamentos' | 'provincias' | 'distritos') {
//   const res = await actionRequestGet<GithubResponse>(
//     `https://github.com/joseluisq/ubigeos-peru/blob/978097e9ce3e1bbd367f40d42a43e1e704f2a875/json/${type}.json`,
//     {
//       cache: 'force-cache',
//     },
//   )

//   const data = JSON.parse(res.payload.blob.rawLines[1]) as T

//   return data
// }

// // export const getPlaces = cache(async () => {
// export async function getPlaces() {
//   const departamentosData = getData<PlaceLocation[]>('departamentos')
//   const provinciasData = getData<Record<string, PlaceLocation[]>>('provincias')
//   const distritosData = getData<Record<string, PlaceLocation[]>>('distritos')

//   const [departamentos, provincias, distritos] = await Promise.all([
//     departamentosData,
//     provinciasData,
//     distritosData,
//   ])

//   const allProvincias = Object.values(provincias).flat()
//   const allDistritos = Object.values(distritos).flat()

//   // console.log({ allProvincias, allDistritos })

//   return {
//     departamentos,
//     provincias: allProvincias,
//     distritos: allDistritos,
//   }
//   // })
// }

export type PlaceLocation = {
  code: string
  name: string
  tag: {
    short: string
    long: string
  }
}

async function getData(type: 'departments' | 'provinces' | 'districts') {
  const data = await actionRequestGet<PlaceLocation[]>(
    `https://ubigeosperu.nijui.com/api/${type}`,
    {
      cache: 'force-cache',
    },
  )

  return data
}

export async function getPlaces() {
  const departamentosData = getData('departments')
  const provinciasData = getData('provinces')
  const distritosData = getData('districts')

  const [departamentos, provincias, distritos] = await Promise.all([
    departamentosData,
    provinciasData,
    distritosData,
  ])

  return {
    departamentos,
    provincias,
    distritos,
  }
}
