import { LinkSearchParams } from '@/components/LinkSearchParams'
import { getBreeds } from '@/controllers/Pet'

export async function FilterBreeds(props: {
  category_id: string
  breed_id: string | string[] | undefined
}) {
  const breedsData = await getBreeds()

  const breeds = breedsData[props.category_id]

  return (
    <section>
      <p className='sticky top-14 bg-th-fg-1 font-semibold text-foreground-900'>Razas</p>

      <div className='flex flex-col gap-y-2'>
        {breeds.map(item => (
          <LinkSearchParams
            key={item.id}
            href={{
              breed_id: {
                value: item.id,
              },
              page: 1,
            }}
            selectedValue={props.breed_id}
            value={item.id}
            className='flex w-full min-w-max cursor-pointer items-center rounded-lg px-2.5 py-1.5 text-sm shadow-md'
            classNames={{
              selected: 'bg-orange-100 text-orange-600',
              notSelected: 'hover:bg-foreground-100',
            }}
            searchParamKey='breed_id'
          >
            {item.name}
          </LinkSearchParams>
        ))}
      </div>
    </section>
  )
}
