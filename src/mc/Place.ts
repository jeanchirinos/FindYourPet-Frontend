'use server'

import { requestNew } from '@/utilities/request'

type GithubResponse = { payload: { blob: { rawLines: [string, string] } } }
export type Location = { id_ubigeo: string; nombre_ubigeo: string; id_padre_ubigeo: string }

function transformGithubData<T>(data: GithubResponse) {
  return JSON.parse(data.payload.blob.rawLines[1]) as T
}

const getRepoUrl = (name: 'departamentos' | 'distritos' | 'provincias') =>
  `https://github.com/joseluisq/ubigeos-peru/blob/978097e9ce3e1bbd367f40d42a43e1e704f2a875/json/${name}.json`

export async function getDepartamentos() {
  const res = await requestNew<GithubResponse>(getRepoUrl('departamentos'), {
    cache: 'force-cache',
  })

  const data = transformGithubData<Location[]>(res.data)

  return data
}

export async function getProvincias() {
  const res = await requestNew<GithubResponse>(getRepoUrl('provincias'), {
    cache: 'force-cache',
  })

  const data = transformGithubData<Record<string, Location[]>>(res.data)

  return data
}

export async function getDistritos() {
  const res = await requestNew<GithubResponse>(getRepoUrl('distritos'), {
    cache: 'force-cache',
  })
  const data = transformGithubData<Record<string, Location[]>>(res.data)

  return data
}
