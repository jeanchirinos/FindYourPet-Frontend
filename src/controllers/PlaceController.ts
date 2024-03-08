'use server'
import { getData } from '@/utilities/actionRequest'

export type PlaceLocation = {
  code: string
  name: string
  tag: {
    short: string
    long: string
  }
}

async function getPlacesData(type: 'departments' | 'provinces' | 'districts') {
  const data = await getData<PlaceLocation[]>(
    `https://ubigeosperu.nijui.com/api/${type}?order_by=is_capital`,
    {
      cache: 'force-cache',
    },
  )

  return data
}

export async function getPlaces() {
  const departamentosData = getPlacesData('departments')
  const provinciasData = getPlacesData('provinces')
  const distritosData = getPlacesData('districts')

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
