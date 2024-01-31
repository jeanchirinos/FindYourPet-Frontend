'use server'
import { actionRequestGet } from '@/utilities/actionRequest'

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
