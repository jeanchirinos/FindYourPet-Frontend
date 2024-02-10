import { PlaceLocation, getPlaces } from '@/controllers/Place'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

export function useFilterPlace() {
  // STATES
  const [places, setPlaces] = useState<{
    departamentos: PlaceLocation[]
    provincias: PlaceLocation[]
    distritos: PlaceLocation[]
  }>({ departamentos: [], provincias: [], distritos: [] })

  const [query, setQuery] = useState('')

  // HOOKS
  const { replace } = useRouter()
  const searchParams = useSearchParams()

  // SEARCH PARAMS
  const departmentSearchParam = searchParams.get('estate')
  const provinceSearchParam = searchParams.get('city')
  const districtSearchParam = searchParams.get('district')

  // EFFECTS
  useEffect(() => {
    async function getPlacesData() {
      const data = await getPlaces()

      setPlaces(data)
    }

    getPlacesData()
  }, [])

  const selectedPlaces = useMemo(() => {
    const filteredDepartamento = places.departamentos.find(d => d.code === departmentSearchParam)
    const filteredProvincia = places.provincias.find(c => c.code === provinceSearchParam)
    const filteredDistritos = places.distritos.filter(d =>
      districtSearchParam?.split(',').includes(d.code),
    )

    const selected = []

    filteredDepartamento && selected.push(filteredDepartamento)
    filteredProvincia && selected.push(filteredProvincia)
    selected.push(...filteredDistritos)

    return selected
  }, [departmentSearchParam, provinceSearchParam, districtSearchParam, places])

  // VALUES
  const filteredPlaces = useMemo(() => {
    function filterByQuery(places: PlaceLocation[], quantity?: number) {
      return places
        .filter(place =>
          place.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        )
        .slice(0, quantity ?? 3)
    }

    const filteredEstates = filterByQuery(places.departamentos)
    const filteredCities = filterByQuery(places.provincias)
    const filteredDistricts = filterByQuery(places.distritos, 5)

    return query === '' ? [] : [...filteredEstates, ...filteredCities, ...filteredDistricts]
  }, [query, places])

  const isDepartment = (item: PlaceLocation | undefined) =>
    item?.code.startsWith('D-') && Number(item.code.slice(2)) < 100

  const isProvince = (item: PlaceLocation | undefined) => item?.code.startsWith('P-')

  const isDistrict = (item: PlaceLocation | undefined) =>
    item?.code.startsWith('D-') && Number(item.code.slice(2)) > 100

  // FUNCTIONS
  function handleChange(value: PlaceLocation[]) {
    const newSearchParams = new URLSearchParams(searchParams)

    const estates = value.filter(v => isDepartment(v))
    const cities = value.filter(v => isProvince(v))
    const districts = value.filter(v => isDistrict(v))

    const lastPlaceAdded = value.at(-1)!

    if (estates.length === 0) {
      newSearchParams.delete('estate')
    }

    if (isDepartment(lastPlaceAdded)) {
      newSearchParams.set('estate', lastPlaceAdded.code)
      newSearchParams.delete('city')
      newSearchParams.delete('district')
    }

    if (cities.length === 0) {
      newSearchParams.delete('city')
    }

    if (isProvince(lastPlaceAdded)) {
      newSearchParams.set('city', lastPlaceAdded.code)
      newSearchParams.delete('estate')
      newSearchParams.delete('district')
    }

    if (districts.length === 0) {
      newSearchParams.delete('district')
    }

    if (isDistrict(lastPlaceAdded)) {
      newSearchParams.set('district', districts.map(d => d.code).join(','))
      newSearchParams.delete('estate')
      newSearchParams.delete('city')
    }

    newSearchParams.delete('page')

    setQuery('')
    replace('?' + newSearchParams.toString())
  }

  function handleRemove(item: PlaceLocation) {
    const newSearchParams = new URLSearchParams(searchParams)

    if (isDepartment(item)) {
      newSearchParams.delete('estate')
    } else if (isProvince(item)) {
      newSearchParams.delete('city')
    } else {
      const districts = selectedPlaces.filter(v => isDistrict(v))
      const filteredDistricts = districts.filter(d => d.code !== item.code)

      if (filteredDistricts.length === 0) {
        newSearchParams.delete('district')
      } else {
        newSearchParams.set('district', filteredDistricts.map(d => d.code).join(','))
      }
    }

    newSearchParams.delete('page')

    replace('?' + newSearchParams.toString())
  }

  return {
    filteredPlaces,
    selectedPlaces,
    query,
    setQuery,
    handleChange,
    handleRemove,
  }
}
