import { actionRequestGet } from '@/utilities/actionRequest'

type GithubResponse = { payload: { blob: { rawLines: [string, string] } } }
type Location = { id_ubigeo: string; nombre_ubigeo: string; id_padre_ubigeo: string }

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
  const departamentos = await getData<Location[]>('departamentos')
  const provincias = await getData<Record<string, Location[]>>('provincias')
  const distritos = await getData<Record<string, Location[]>>('distritos')

  return {
    departamentos,
    provincias,
    distritos,
  }
}
