import { getPlaces, getPlaces2 } from '@/controllers/Place'
import { FilterPlaceClient } from './FilterPlaceClient'
// import { FilterPlaceClient } from './FilterPlaceClient'

export async function FilterPlace() {
  const { departamentos, provincias, distritos } = await getPlaces()
  // const distritosData = getPlaces()
  // const provinciasData = getPlaces2()

  // console.log({ places })

  // const [provincias, distritos] = await Promise.all([
  //   // departamentosData,
  //   provinciasData,
  //   distritosData,
  // ])

  // console.log({ provincias, distritos })

  const allProvincias = Object.values(provincias).flat()

  const allDistritos = Object.values(distritos)
    .flat()
    .map(d => {
      const provincia = allProvincias.find(p => p.id_ubigeo === d.id_padre_ubigeo)
      const departamento = departamentos.find(d => d.id_ubigeo === provincia?.id_padre_ubigeo)

      const tag = `${d.etiqueta_ubigeo}, ${departamento?.nombre_ubigeo}`

      return { ...d, etiqueta_ubigeo: tag }
    })

  return (
    // <FilterPlaceClient
    //   departamentos={departamentos}
    //   provincias={allProvincias}
    //   distritos={allDistritos}
    // />
    <FilterPlaceClient
      departamentos={departamentos}
      provincias={allProvincias}
      distritos={allDistritos}
    />
  )
}
