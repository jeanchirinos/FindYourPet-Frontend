import { getPlaces } from '@/controllers/Place'
import { FilterPlaceClient } from './FilterPlaceClient'
import { memo } from 'react'
// import { FilterPlaceClient } from './FilterPlaceClient'

// export async function FilterPlace() {
const FilterPlace = memo(async function FilterPlace() {
  const { departamentos, provincias, distritos } = await getPlaces()

  // console.log({ departamentos, provincias, distritos })

  // const distritosData = getPlaces()
  // const provinciasData = getPlaces2()

  // console.log({ places })

  // const [provincias, distritos] = await Promise.all([
  //   // departamentosData,
  //   provinciasData,
  //   distritosData,
  // ])

  // console.log({ departamentos, provincias, distritos })

  return (
    // <FilterPlaceClient
    //   departamentos={departamentos}
    //   provincias={allProvincias}
    //   distritos={allDistritos}
    // />
    <FilterPlaceClient
      departamentos={departamentos}
      provincias={provincias}
      distritos={distritos}
    />
    // <h2>Hola</h2>
  )
})

export default FilterPlace
