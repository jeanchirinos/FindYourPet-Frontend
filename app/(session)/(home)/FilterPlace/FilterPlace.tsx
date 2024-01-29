import { LinkSearchParams } from '@/components/LinkSearchParams'
import { getPlaces } from '@/controllers/Place'
import { FilterDistrito } from './FilterDistrito'
import { SelectNative } from '@/components/Select/SelectNative'

export async function FilterPlace(props: { estate: string | undefined; city: string | undefined }) {
  const { estate, city } = props

  const places = await getPlaces()

  const { departamentos, provincias, distritos } = places

  const provinciasList = estate ? provincias[estate] : undefined

  return (
    <>
      <section>
        <p className='sticky top-14 bg-th-fg-1 font-semibold text-foreground-900'>Departamento</p>

        <div className='flex flex-col gap-y-2'>
          {departamentos.map(item => (
            <LinkSearchParams
              key={item.id_ubigeo}
              href={{
                estate: item.id_ubigeo,
                page: 1,
              }}
              selectedValue={estate}
              value={item.id_ubigeo}
              className='flex w-full min-w-max cursor-pointer items-center rounded-lg px-2.5 py-1.5 text-sm shadow-md'
              classNames={{
                selected: 'bg-orange-100 text-orange-600',
                notSelected: 'hover:bg-foreground-100',
              }}
              toggle
              searchParamKey='estate'
            >
              {item.nombre_ubigeo}
            </LinkSearchParams>
          ))}
        </div>
      </section>

      {/* <SelectNative */}

      {provinciasList && <FilterDistrito distritos={provinciasList} />}
    </>
  )
}
