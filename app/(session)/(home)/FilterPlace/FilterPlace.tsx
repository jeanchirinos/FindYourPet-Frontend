// import { getPlaces } from '@/controllers/Place'
import { FilterPlaceClient } from './FilterPlaceClient'
import { memo } from 'react'
// import { FilterPlaceClient } from './FilterPlaceClient'
import departamentos from '@/data/departamentos.json'
import provincias from '@/data/provinciasConverted.json'
import distritos from '@/data/distritosConverted.json'

// export async function FilterPlace() {
const FilterPlace = memo(async function FilterPlace() {
  // const { departamentos, provincias, distritos } = await getPlaces()

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
      // departamentos={departamentos as any}
      // provincias={provincias as any}
      distritos={distritos.slice(0, 250) as any}
      distritos2={distritos.slice(250, 500) as any}
      distritos3={distritos.slice(500, 750) as any}
      distritos4={distritos.slice(750, 1000) as any}
      distritos5={distritos.slice(1000, 1250) as any}
    />
    // <h2>Hola</h2>
  )
})

export default FilterPlace
