'use server'
import { actionRequestGet } from '@/utilities/actionRequest'

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

export async function getPlaces() {
  // const departamentos = await getData<PlaceLocation[]>('departamentos')
  // const provincias = await getData<Record<string, PlaceLocation[]>>('provincias')
  // const distritos = await getData<Record<string, PlaceLocation[]>>('distritos')

  // const departamentosData = getData<PlaceLocation[]>('departamentos')
  // const provinciasData = getData<Record<string, PlaceLocation[]>>('provincias')
  // const distritosData = getData<Record<string, PlaceLocation[]>>('distritos')

  // const [departamentos, provincias, distritos] = await Promise.all([
  //   departamentosData,
  //   provinciasData,
  //   distritosData,
  // ])

  const res = await actionRequestGet<GithubResponse>(
    // `https://github.com/joseluisq/ubigeos-peru/blob/978097e9ce3e1bbd367f40d42a43e1e704f2a875/json/${type}.json`,
    `https://github.com/joseluisq/ubigeos-peru/blob/978097e9ce3e1bbd367f40d42a43e1e704f2a875/json/departamentos.json`,
    {
      cache: 'force-cache',
    },
  )

  // const res2 = await actionRequestGet<GithubResponse>(
  //   // `https://github.com/joseluisq/ubigeos-peru/blob/978097e9ce3e1bbd367f40d42a43e1e704f2a875/json/${type}.json`,
  //   `https://github.com/joseluisq/ubigeos-peru/blob/978097e9ce3e1bbd367f40d42a43e1e704f2a875/json/provincias.json`,
  //   {
  //     cache: 'force-cache',
  //   },
  // )

  const data = JSON.parse(res.payload.blob.rawLines[1])
  // const data2 = JSON.parse(res2.payload.blob.rawLines[1])

  // return {
  //   data,
  //   data2,
  // }

  return data

  // return {
  //   departamentos,
  //   provincias,
  //   distritos,
  // }
}

export async function getPlaces2() {
  const res = await actionRequestGet<GithubResponse>(
    `https://github.com/joseluisq/ubigeos-peru/blob/978097e9ce3e1bbd367f40d42a43e1e704f2a875/json/provincias.json`,
    {
      cache: 'force-cache',
    },
  )

  const data = JSON.parse(res.payload.blob.rawLines[1])

  return data
}

export type Places = Awaited<ReturnType<typeof getPlaces>>
