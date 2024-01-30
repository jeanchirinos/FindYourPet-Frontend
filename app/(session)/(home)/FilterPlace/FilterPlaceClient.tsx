'use client'
// import { Fragment, useEffect, useMemo, useState, memo } from 'react'
// import { Combobox, Transition } from '@headlessui/react'
// import { IconArrowDown, IconCheck } from '@/icons'
// import { useRouter, useSearchParams } from 'next/navigation'

import { PlaceLocation } from '@/controllers/Place'
// import { Chip } from '@nextui-org/react'
// import departamentos from '@/data/departamentos.json'
// import provincias from '@/data/provinciasConverted.json'
// import distritos from '@/data/distritosConverted.json'

type Props = {
  // departamentos: PlaceLocation[]
  // provincias: PlaceLocation[]
  distritos: PlaceLocation[]
}

export function FilterPlaceClient(props: any) {
  return <h2>Hola</h2>
}

// export const FilterPlaceClient = memo(function FilterPlaceClient(props: Props) {
// export const FilterPlaceClient = memo(function FilterPlaceClient() {
//   console.log('render FilterPlaceClient')
//   // })

//   // export function FilterPlaceClient(props: Props) {
//   // const { departamentos, provincias, distritos } = props

//   // STATES
//   const [selected, setSelected] = useState<typeof distritos>([])
//   const [query, setQuery] = useState('')

//   // HOOKS
//   const { replace } = useRouter()
//   const searchParams = useSearchParams()

//   // EFFECTS
//   useEffect(() => {
//     const filteredDepartamento = departamentos.find(d => d.id_ubigeo === searchParams.get('estate'))

//     const filteredProvincia = provincias.find(c => c.id_ubigeo === searchParams.get('city'))

//     const filteredDistritos = distritos.filter(d =>
//       searchParams.get('district')?.split(',').includes(d.id_ubigeo),
//     )

//     const selected = []

//     filteredDepartamento && selected.push(filteredDepartamento)
//     filteredProvincia && selected.push(filteredProvincia)
//     selected.push(...filteredDistritos)

//     setSelected(selected)
//     // }, [searchParams, distritos, provincias, departamentos])
//   }, [searchParams])

//   // VALUES
//   const filteredPlaces = useMemo(() => {
//     const filteredEstates = departamentos
//       .filter(estate =>
//         estate.nombre_ubigeo
//           .toLowerCase()
//           .replace(/\s+/g, '')
//           .includes(query.toLowerCase().replace(/\s+/g, '')),
//       )
//       .slice(0, 3)

//     const filteredCities = provincias
//       .filter(city =>
//         city.nombre_ubigeo
//           .toLowerCase()
//           .replace(/\s+/g, '')
//           .includes(query.toLowerCase().replace(/\s+/g, '')),
//       )
//       .slice(0, 3)

//     const filteredDistricts = distritos
//       .filter(district =>
//         district.nombre_ubigeo
//           .toLowerCase()
//           .replace(/\s+/g, '')
//           .includes(query.toLowerCase().replace(/\s+/g, '')),
//       )
//       .slice(0, 5)

//     return query === '' ? [] : [...filteredEstates, ...filteredCities, ...filteredDistricts]
//     // }, [query, distritos, provincias, departamentos])
//   }, [query])

//   // FUNCTIONS
//   function handleChange(value: PlaceLocation[]) {
//     const newSearchParams = new URLSearchParams(searchParams)

//     const estates = value.filter(v => v.nivel_ubigeo === '1')
//     const cities = value.filter(v => v.nivel_ubigeo === '2')
//     const districts = value.filter(v => v.nivel_ubigeo === '3')

//     const lastPlaceAdded = value.at(-1)

//     if (estates.length === 0) {
//       newSearchParams.delete('estate')
//     }

//     if (lastPlaceAdded?.nivel_ubigeo === '1') {
//       newSearchParams.set('estate', lastPlaceAdded.id_ubigeo)
//       newSearchParams.delete('city')
//       newSearchParams.delete('district')
//     }

//     if (cities.length === 0) {
//       newSearchParams.delete('city')
//     }

//     if (lastPlaceAdded?.nivel_ubigeo === '2') {
//       newSearchParams.set('city', lastPlaceAdded.id_ubigeo)
//       newSearchParams.delete('estate')
//       newSearchParams.delete('district')
//     }

//     if (districts.length === 0) {
//       newSearchParams.delete('district')
//     }

//     if (lastPlaceAdded?.nivel_ubigeo === '3') {
//       newSearchParams.set('district', districts.map(d => d.id_ubigeo).join(','))
//       newSearchParams.delete('estate')
//       newSearchParams.delete('city')
//     }

//     setQuery('')
//     replace('?' + newSearchParams.toString())

//     // setSelected(value)
//   }

//   function handleRemove(item: PlaceLocation) {
//     const newSearchParams = new URLSearchParams(searchParams)

//     if (item.nivel_ubigeo === '1') {
//       newSearchParams.delete('estate')
//     } else if (item.nivel_ubigeo === '2') {
//       newSearchParams.delete('city')
//     } else {
//       const districts = selected.filter(v => v.nivel_ubigeo === '3')
//       const filteredDistricts = districts.filter(d => d.id_ubigeo !== item.id_ubigeo)

//       if (filteredDistricts.length === 0) {
//         newSearchParams.delete('district')
//       } else {
//         newSearchParams.set('district', filteredDistricts.map(d => d.id_ubigeo).join(','))
//       }
//     }

//     replace('?' + newSearchParams.toString())
//   }

//   // RENDER
//   return (
//     <div className='flex w-96 max-w-full flex-col gap-y-2.5'>
//       <Combobox value={selected} onChange={handleChange} multiple>
//         <div className='relative z-20 mt-1 w-full'>
//           <div className='relative w-full cursor-default text-left shadow-md sm:text-sm'>
//             <Combobox.Input
//               className='w-full rounded-lg border-none py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none'
//               placeholder='Ubicación'
//               onChange={e => setQuery(e.target.value)}
//               value={query}
//             />
//             <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
//               <IconArrowDown className='size-5 text-gray-400' aria-hidden='true' />
//             </div>
//           </div>
//           <Transition
//             as={Fragment}
//             leave='transition ease-in duration-100'
//             leaveFrom='opacity-100'
//             leaveTo='opacity-0'
//             afterLeave={() => setQuery('')}
//           >
//             <Combobox.Options className='text- absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-foreground-200 shadow-lg focus:outline-none sm:text-sm'>
//               {filteredPlaces.length === 0 && query !== '' ? (
//                 <div className='relative cursor-default select-none px-4 py-2 text-gray-700'>
//                   Sin resultados
//                 </div>
//               ) : (
//                 filteredPlaces.map(place => (
//                   <Combobox.Option
//                     key={place.id_ubigeo}
//                     className={({ active }) =>
//                       `relative cursor-default select-none py-2 pl-10 pr-4 ${
//                         active ? 'bg-primary text-white' : ''
//                       }`
//                     }
//                     value={place}
//                   >
//                     {({ selected, active }) => (
//                       <>
//                         <span
//                           className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
//                         >
//                           {place.etiqueta_ubigeo}
//                         </span>
//                         {selected ? (
//                           <span
//                             className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
//                               active ? 'text-white' : 'text-primary'
//                             }`}
//                           >
//                             <IconCheck className='h-5 w-5' aria-hidden='true' />
//                           </span>
//                         ) : null}
//                       </>
//                     )}
//                   </Combobox.Option>
//                 ))
//               )}
//             </Combobox.Options>
//           </Transition>
//         </div>
//       </Combobox>

//       <div className='flex h-7 gap-x-2.5'>
//         {selected.map(item => (
//           <Chip
//             onClose={() => handleRemove(item as any)}
//             key={item.id_ubigeo}
//             title={item.etiqueta_ubigeo}
//           >
//             {item.nombre_ubigeo}
//           </Chip>
//         ))}
//       </div>
//     </div>
//   )
// })
