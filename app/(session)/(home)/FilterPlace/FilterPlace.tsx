import { getPlaces } from '@/controllers/Place'
// import { FilterPlaceClient } from './FilterPlaceClient'
// import { waitFor } from '@/utilities/utilities'

export async function FilterPlace() {
  // await waitFor(3)
  const { departamentos, provincias, distritos } = await getPlaces()

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
    <h2>Hola</h2>
  )
}
