'use client'

import { Fragment, useEffect, useMemo, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { IconCheck, IconSearch } from '@/icons'
import { useRouter, useSearchParams } from 'next/navigation'
import { PlaceLocation, getPlaces } from '@/controllers/Place'
import { Chip } from '@nextui-org/react'

export function FilterPlace() {
  // STATES
  const [places, setPlaces] = useState<{
    departamentos: PlaceLocation[]
    provincias: PlaceLocation[]
    distritos: PlaceLocation[]
  }>({ departamentos: [], provincias: [], distritos: [] })

  const [selectedPlacesState, setSelectedPlacesState] = useState<PlaceLocation[] | null>(null)
  const selectedPlaces = selectedPlacesState ?? []

  const [query, setQuery] = useState('')

  // HOOKS
  const { replace } = useRouter()
  const searchParams = useSearchParams()

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

  useEffect(() => {
    setSelectedPlacesState(prevState => {
      if (prevState === null && places.departamentos.length > 0) {
        const filteredDepartamento = places.departamentos.find(
          d => d.code === departmentSearchParam,
        )
        const filteredProvincia = places.provincias.find(c => c.code === provinceSearchParam)
        const filteredDistritos = places.distritos.filter(d =>
          districtSearchParam?.split(',').includes(d.code),
        )

        const selected = []

        filteredDepartamento && selected.push(filteredDepartamento)
        filteredProvincia && selected.push(filteredProvincia)
        selected.push(...filteredDistritos)

        return selected
      } else {
        return prevState
      }
    })
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

      setSelectedPlacesState([lastPlaceAdded])
    }

    if (cities.length === 0) {
      newSearchParams.delete('city')
    }

    if (isProvince(lastPlaceAdded)) {
      newSearchParams.set('city', lastPlaceAdded.code)
      newSearchParams.delete('estate')
      newSearchParams.delete('district')
      setSelectedPlacesState([lastPlaceAdded])
    }

    if (districts.length === 0) {
      newSearchParams.delete('district')
    }

    if (isDistrict(lastPlaceAdded)) {
      newSearchParams.set('district', districts.map(d => d.code).join(','))
      newSearchParams.delete('estate')
      newSearchParams.delete('city')

      setSelectedPlacesState(districts)
    }

    setQuery('')
    replace('?' + newSearchParams.toString())
  }

  function handleRemove(item: PlaceLocation) {
    const newSearchParams = new URLSearchParams(searchParams)

    if (isDepartment(item)) {
      newSearchParams.delete('estate')
      setSelectedPlacesState([])
    } else if (isProvince(item)) {
      newSearchParams.delete('city')
      setSelectedPlacesState([])
    } else {
      const districts = selectedPlaces.filter(v => isDistrict(v))
      const filteredDistricts = districts.filter(d => d.code !== item.code)

      if (filteredDistricts.length === 0) {
        newSearchParams.delete('district')
        setSelectedPlacesState([])
      } else {
        newSearchParams.set('district', filteredDistricts.map(d => d.code).join(','))
        setSelectedPlacesState(filteredDistricts)
      }
    }

    replace('?' + newSearchParams.toString())
  }

  // RENDER
  return (
    <div className='flex w-96 max-w-full flex-col gap-y-2.5'>
      <Combobox value={selectedPlaces} onChange={handleChange} multiple>
        <div className='relative z-20 w-full'>
          <div className='relative w-full cursor-default text-left shadow-md sm:text-sm'>
            <Combobox.Input
              className='w-full rounded-lg border-none py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none'
              placeholder='Ubicación'
              onChange={e => setQuery(e.target.value)}
              value={query}
            />
            <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
              <IconSearch className='size-5 text-gray-400' aria-hidden='true' />
            </div>
          </div>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-foreground-200 shadow-lg focus:outline-none sm:text-sm'>
              {filteredPlaces.length === 0 && query !== '' ? (
                <div className='relative cursor-default select-none px-4 py-2'>Sin resultados</div>
              ) : (
                filteredPlaces.map(place => (
                  <Combobox.Option
                    key={place.code}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-primary text-white' : ''
                      }`
                    }
                    value={place}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                        >
                          {place.tag.long}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-primary'
                            }`}
                          >
                            <IconCheck className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>

      <div className='flex h-7 gap-x-2.5'>
        {selectedPlaces.map(item => (
          <Chip onClose={() => handleRemove(item)} key={item.code} title={item.tag.long}>
            {item.name}
          </Chip>
        ))}
      </div>
    </div>
  )
}
