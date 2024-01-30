'use server'
import { actionRequestGet } from '@/utilities/actionRequest'
import { cache } from 'react'

type GithubResponse = { payload: { blob: { rawLines: [string, string] } } }
export type PlaceLocation = {
  id_ubigeo: string
  nombre_ubigeo: string
  codigo_ubigeo: string
  etiqueta_ubigeo: string
  buscador_ubigeo: string
  numero_hijos_ubigeo: string
  nivel_ubigeo: '1' | '2' | '3'
  id_padre_ubigeo: string
}

async function getData<T>(type: 'departamentos' | 'provincias' | 'distritos') {
  const res = await actionRequestGet<GithubResponse>(
    `https://github.com/joseluisq/ubigeos-peru/blob/978097e9ce3e1bbd367f40d42a43e1e704f2a875/json/${type}.json`,
    {
      cache: 'force-cache',
    },
  )

  const data = JSON.parse(res.payload.blob.rawLines[1]) as T

  return data
}

// function flatten(arr: any) {
//   const flattened = [] as any[]

//   //@ts-nocheck
//   !(function flat(arr) {
//     arr.forEach(function (el: any) {
//       if (Array.isArray(el)) flat(el)
//       else flattened.push(el)
//     })
//   })(arr)

//   return flattened
// }

export const getPlaces = cache(async () => {
  const departamentosData = getData<PlaceLocation[]>('departamentos')
  const provinciasData = getData<Record<string, PlaceLocation[]>>('provincias')
  const distritosData = getData<Record<string, PlaceLocation[]>>('distritos')

  const [departamentos, provincias, distritos] = await Promise.all([
    departamentosData,
    provinciasData,
    distritosData,
  ])

  const allProvincias = Object.values(provincias).flat()
  const allDistritos = Object.values(distritos).flat()

  // console.log({ allProvincias, allDistritos })

  return {
    departamentos,
    // provincias: provincias['2534'],
    // distritos: distritos['2557'],
    provincias: allProvincias,
    distritos: allDistritos,
  }
})
